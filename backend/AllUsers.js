const express = require("express");

const router = express.Router();

const { sql, poolPromise } = require("./database");

router.get("/", async (req, res) => {
    try {
        const { search } = req.query;

        const pool = await poolPromise;
        const request = pool.request();

        let query = `
            SELECT
                u.users_id,
                u.first_name,
                u.last_name,
                u.email,
                u.phone_nbr,
                u.Role_id,
                s.Service_name,
                s.Description
            FROM dbo.Users u
            INNER JOIN dbo.Services s
                ON u.users_id = s.users_id
            WHERE u.Role_id = 1
        `;

        if (search) {
            query += `
                AND (
                    u.first_name LIKE @search
                    OR u.last_name LIKE @search
                )
            `;

            request.input(
                "search",
                sql.VarChar,
                `%${search}%`
            );
        }

        query += `
            ORDER BY u.first_name ASC
        `;

        const result = await request.query(query);

        res.status(200).json(result.recordset);

    } catch (error) {

        console.error("ERROR IN /api/users:", error);

        res.status(500).json({
            message: "An error occurred while searching users",
            error: error.message
        });
    }
});

module.exports = router;
