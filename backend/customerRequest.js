const express = require("express");

const router = express.Router();

const { sql, poolPromise } = require("./database");

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request().query(`
            SELECT
                request_id,
                users_id,
                service_id,
                title,
                description,
                status,
                created_at
            FROM CustomerRequests
            ORDER BY request_id DESC
        `);

        res.status(200).json(result.recordset);
    } catch (error) {
        console.error("Error getting customer requests:", error);

        res.status(500).json({
            message: "Failed to get customer requests",
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const request_id = Number(req.params.id);

        if (!request_id) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("request_id", sql.Int, request_id)
            .query(`
                SELECT
                    request_id,
                    users_id,
                    service_id,
                    title,
                    description,
                    status,
                    created_at
                FROM CustomerRequests
                WHERE request_id = @request_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Customer request not found"
            });
        }

        res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error("Error getting customer request:", error);

        res.status(500).json({
            message: "Failed to get customer request",
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const {
            users_id,
            service_id,
            title,
            description
        } = req.body;

        if (!users_id || !service_id || !title || !description) {
            return res.status(400).json({
                message: "users_id, service_id, title and description are required"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("users_id", sql.Int, Number(users_id))
            .input("service_id", sql.Int, Number(service_id))
            .input("title", sql.VarChar(255), title)
            .input("description", sql.VarChar(sql.MAX), description)
            .query(`
                INSERT INTO CustomerRequests
                (
                    users_id,
                    service_id,
                    title,
                    description,
                    status,
                    created_at
                )
                OUTPUT INSERTED.*
                VALUES
                (
                    @users_id,
                    @service_id,
                    @title,
                    @description,
                    'Pending',
                    GETDATE()
                )
            `);

        res.status(201).json({
            message: "Customer request created successfully",
            request: result.recordset[0]
        });
    } catch (error) {
        console.error("Error creating customer request:", error);

        res.status(500).json({
            message: "Failed to create customer request",
            error: error.message
        });
    }
});

router.put("/:id/status", async (req, res) => {
    try {
        const request_id = Number(req.params.id);
        const { status } = req.body;

        if (!request_id || !status) {
            return res.status(400).json({
                message: "Request ID and status are required"
            });
        }

        const allowedStatuses = [
            "Pending",
            "In Progress",
            "Completed",
            "Rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("request_id", sql.Int, request_id)
            .input("status", sql.VarChar(50), status)
            .query(`
                UPDATE CustomerRequests
                SET status = @status
                OUTPUT INSERTED.*
                WHERE request_id = @request_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Customer request not found"
            });
        }

        res.status(200).json({
            message: "Request status updated successfully",
            request: result.recordset[0]
        });
    } catch (error) {
        console.error("Error updating request status:", error);

        res.status(500).json({
            message: "Failed to update request status",
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const request_id = Number(req.params.id);

        if (!request_id) {
            return res.status(400).json({
                message: "Invalid request ID"
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input("request_id", sql.Int, request_id)
            .query(`
                DELETE FROM CustomerRequests
                OUTPUT DELETED.*
                WHERE request_id = @request_id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: "Customer request not found"
            });
        }

        res.status(200).json({
            message: "Customer request deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting customer request:", error);

        res.status(500).json({
            message: "Failed to delete customer request",
            error: error.message
        });
    }
});

module.exports = router;