
const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { sql, poolPromise } = require("./database");

const uploadFolder = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});
const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
    ".jpg",
    ".jpeg",
    ".png"
];

const fileFilter = function (req, file, cb) {

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Invalid file type. Only PDF, DOC, DOCX, JPG, JPEG and PNG files are allowed."
            )
        );
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
router.post(
    "/",
    upload.single("document"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    message: "Please select a file."
                });
            }

            const users_id = req.user.users_id;

            const file_name = req.file.originalname;
            const file_path = req.file.path;
            const file_type = req.file.mimetype;
            const file_size = req.file.size;

            const pool = await poolPromise;

            const result = await pool.request()
                .input("file_name", sql.VarChar(255), file_name)
                .input("file_path", sql.VarChar(500), file_path)
                .input("file_type", sql.VarChar(100), file_type)
                .input("file_size", sql.Int, file_size)
                .input("users_id", sql.Int, users_id)
                .query(`
                    INSERT INTO Documents
                    (
                        file_name,
                        file_path,
                        file_type,
                        file_size,
                        users_id
                    )
                    OUTPUT INSERTED.*
                    VALUES
                    (
                        @file_name,
                        @file_path,
                        @file_type,
                        @file_size,
                        @users_id
                    )
                `);

            res.status(201).json({
                message: "Document uploaded successfully",
                document: result.recordset[0]
            });

        } catch (error) {

            console.error("UPLOAD ERROR:", error);

            res.status(500).json({
                message: "Server error while uploading document."
            });
        }
    }
);

router.get("/", async (req, res) => {

    try {

        const users_id = req.user.users_id;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("users_id", sql.Int, users_id)
            .query(`
                SELECT
                    document_id,
                    file_name,
                    file_type,
                    file_size,
                    uploaded_at
                FROM Documents
                WHERE users_id = @users_id
                ORDER BY uploaded_at DESC
            `);

        res.status(200).json(result.recordset);

    } catch (error) {

        console.error("GET DOCUMENTS ERROR:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        const document_id = parseInt(req.params.id);
        const users_id = req.user.users_id;

        const pool = await poolPromise;
      const result = await pool.request()
            .input("document_id", sql.Int, document_id)
            .input("users_id", sql.Int, users_id)
            .query(`
                SELECT file_path
                FROM Documents
                WHERE document_id = @document_id
                AND users_id = @users_id
            `);

        if (result.recordset.length === 0) {

            return res.status(404).json({
                message: "Document not found or unauthorized."
            });
        }

        const filePath = result.recordset[0].file_path;

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await pool.request()
            .input("document_id", sql.Int, document_id)
            .input("users_id", sql.Int, users_id)
            .query(`
                DELETE FROM Documents
                WHERE document_id = @document_id
                AND users_id = @users_id
            `);

        res.status(200).json({
            message: "Document deleted successfully."
        });

    } catch (error) {

        console.error("DELETE DOCUMENT ERROR:", error);

        res.status(500).json({
            message: "Server error."
        });
    }
});

module.exports = router;

