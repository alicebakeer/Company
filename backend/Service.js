const express = require('express');
const router = express.Router();

const { sql, poolPromise } = require('./database');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`
                SELECT *
                FROM dbo.Services
                ORDER BY service_id DESC
            `);

        res.status(200).json(result.recordset);

    } catch (error) {

        console.error('Error fetching services:', error);

        res.status(500).json({
            message: 'An error occurred while fetching services'
        });

    }
});




router.post('/', async (req, res) => {

    try {

        const {
            Service_name,
            Description,
            users_id
        } = req.body;

        if (!Service_name || !Description || !users_id) {

            return res.status(400).json({
                message: 'Service name, description and users_id are required'
            });

        }

        const pool = await poolPromise;

        const result = await pool.request()

            .input(
                'Service_name',
                sql.VarChar(255),
                Service_name
            )

            .input(
                'Description',
                sql.VarChar(255),
                Description
            )

            .input(
                'users_id',
                sql.Int,
                users_id
            )

            .query(`
                INSERT INTO dbo.Services
                (
                    Service_name,
                    Description,
                    Created_at,
                    users_id
                )

                OUTPUT INSERTED.*

                VALUES
                (
                    @Service_name,
                    @Description,
                    GETDATE(),
                    @users_id
                )
            `);

        res.status(201).json({

            message: 'Service submitted successfully',

            content: result.recordset[0]

        });

    } catch (error) {

        console.error('Error submitting service:', error);

        res.status(500).json({
            message: 'An error occurred while submitting the service'
        });

    }

});
router.put('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            Service_name,
            Description,
            users_id
        } = req.body;

        if (!Service_name || !Description || !users_id) {

            return res.status(400).json({
                message: 'Service name, description and users_id are required'
            });

        }

        const pool = await poolPromise;

        const result = await pool.request()

            .input(
                'id',
                sql.Int,
                Number(id)
            )

            .input(
                'Service_name',
                sql.VarChar(255),
                Service_name
            )

            .input(
                'Description',
                sql.VarChar(255),
                Description
            )

            .input(
                'users_id',
                sql.Int,
                users_id
            )

            .query(`
                UPDATE dbo.Services

                SET
                    Service_name = @Service_name,
                    Description = @Description

                OUTPUT INSERTED.*

                WHERE service_id = @id
                AND users_id = @users_id
            `);

        if (result.recordset.length === 0) {

            return res.status(404).json({
                message: 'Service not found'
            });

        }

        res.status(200).json({

            message: 'Service updated successfully',

            content: result.recordset[0]

        });

    } catch (error) {

        console.error('Error updating service:', error);

        res.status(500).json({
            message: 'An error occurred while updating the service'
        });

    }

});

router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()

            .input(
                'id',
                sql.Int,
                Number(id)
            )

            .query(`
                DELETE FROM dbo.Services

                WHERE service_id = @id
            `);

        if (result.rowsAffected[0] === 0) {

            return res.status(404).json({
                message: 'Service not found'
            });

        }

        res.status(200).json({
            message: 'Service deleted successfully'
        });

    } catch (error) {

        console.error('Error deleting service:', error);

        res.status(500).json({
            message: 'An error occurred while deleting the service'
        });

    }

});


module.exports = router;