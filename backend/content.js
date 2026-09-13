const express = require('express');

const router = express.Router();

const { sql, poolPromise } = require('./database');


// get all content
router.get('/content', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`
                SELECT *
                FROM dbo.Content
                ORDER BY content_id DESC
            `);

        res.status(200).json(result.recordset);

    } catch (error) {
        console.error('Error fetching content:', error);

        res.status(500).json({
            message: 'An error occurred while fetching content'
        });
    }
});

// related to insert
router.post('/content', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description are required'
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input('title', sql.VarChar(100), title)
            .input('description', sql.VarChar(sql.MAX), description)
            .query(`
                INSERT INTO dbo.Content (title, description)
                OUTPUT INSERTED.*
                VALUES (@title, @description)
            `);

        res.status(201).json({
            message: 'Content submitted successfully',
            content: result.recordset[0]
        });

    } catch (error) {
        console.error('Error submitting content:', error);

        res.status(500).json({
            message: 'An error occurred while submitting the content'
        });
    }
});


// related to update
router.put('/content/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description are required'
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, Number(id))
            .input('title', sql.VarChar(100), title)
            .input('description', sql.VarChar(sql.MAX), description)
            .query(`
                UPDATE dbo.Content
                SET
                    title = @title,
                    description = @description
                OUTPUT INSERTED.*
                WHERE content_id = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({
                message: 'Content not found'
            });
        }

        res.status(200).json({
            message: 'Content updated successfully',
            content: result.recordset[0]
        });

    } catch (error) {
        console.error('Error updating content:', error);

        res.status(500).json({
            message: 'An error occurred while updating the content'
        });
    }
});

//related to delete content
router.delete('/content/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input('id', sql.Int, Number(id))
            .query(`
                DELETE FROM dbo.Content
                WHERE content_id = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({
                message: 'Content not found'
            });
        }

        res.status(200).json({
            message: 'Content deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting content:', error);

        res.status(500).json({
            message: 'An error occurred while deleting the content'
        });
    }
});


module.exports = router;