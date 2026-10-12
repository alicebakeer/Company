const express = require("express");
const { sql, poolPromise } = require("./database");

const router = express.Router();
router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`
                SELECT
                    project_id,
                    project_name,
                    project_description,
                    users_id
                FROM Projects
                ORDER BY project_id DESC
            `);

        res.status(200).json(result.recordset);

    } catch (error) {
        console.error("Error getting projects:", error);

        res.status(500).json({
            message: "Error getting projects"
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const projectId = Number(req.params.id);

        const pool = await poolPromise;

        const result = await pool.request()
            .input("project_id", sql.Int, projectId)
            .query(`
                SELECT
                    project_id,
                    project_name,
                    project_description,
                    users_id
                FROM Projects
                WHERE project_id = @project_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(result.recordset[0]);

    } catch (error) {
        console.error("Error getting project:", error);

        res.status(500).json({
            message: "Error getting project"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            project_name,
            project_description,
            users_id
        } = req.body;

        if (!project_name || !users_id) {
            return res.status(400).json({
                message: "Project name and users_id are required"
            });
        }

        const pool = await poolPromise;
        const userResult = await pool.request()
            .input("users_id", sql.Int, users_id)
            .query(`
                SELECT users_id
                FROM Users
                WHERE users_id = @users_id
            `);

        if (userResult.recordset.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const result = await pool.request()
            .input(
                "project_name",
                sql.VarChar(255),
                project_name
            )
            .input(
                "project_description",
                sql.VarChar(sql.MAX),
                project_description || null
            )
            .input(
                "users_id",
                sql.Int,
                users_id
            )
            .query(`
                INSERT INTO Projects
                (
                    project_name,
                    project_description,
                    users_id
                )
                OUTPUT
                    INSERTED.project_id,
                    INSERTED.project_name,
                    INSERTED.project_description,
                    INSERTED.users_id
                VALUES
                (
                    @project_name,
                    @project_description,
                    @users_id
                )
            `);

        res.status(201).json({
            message: "Project created successfully",
            project: result.recordset[0]
        });

    } catch (error) {
        console.error("Error creating project:", error);

        res.status(500).json({
            message: "Error creating project"
        });
    }
});router.put("/:id", async (req, res) => {
    try {
        const projectId = Number(req.params.id);

        const {
            project_name,
            project_description
        } = req.body;

        if (!project_name) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input(
                "project_id",
                sql.Int,
                projectId
            )
            .input(
                "project_name",
                sql.VarChar(255),
                project_name
            )
            .input(
                "project_description",
                sql.VarChar(sql.MAX),
                project_description || null
            )
            .query(`
                UPDATE Projects
                SET
                    project_name = @project_name,
                    project_description = @project_description
                OUTPUT
                    INSERTED.project_id,
                    INSERTED.project_name,
                    INSERTED.project_description,
                    INSERTED.users_id
                WHERE project_id = @project_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project: result.recordset[0]
        });

    } catch (error) {
        console.error("Error updating project:", error);

        res.status(500).json({
            message: "Error updating project"
        });
    }
});


// DELETE PROJECT
router.delete("/:id", async (req, res) => {
    try {
        const projectId = Number(req.params.id);

        const pool = await poolPromise;

        const result = await pool.request()
            .input(
                "project_id",
                sql.Int,
                projectId
            )
            .query(`
                DELETE FROM Projects
                WHERE project_id = @project_id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting project:", error);

        res.status(500).json({
            message: "Error deleting project"
        });
    }
});


module.exports = router;