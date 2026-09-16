const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const { sql, poolPromise } = require('./database');

router.post('/Signup', async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            email,
            password,
            phone_nbr,
            Role_id
        } = req.body;
        if (!first_name || !last_name || !email || !password || !phone_nbr) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const pool = await poolPromise;

        const existingUser = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query(`
                SELECT users_id
                FROM Users
                WHERE email = @email
            `);

        if (existingUser.recordset.length > 0) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('first_name', sql.VarChar(100), first_name)
            .input('last_name', sql.VarChar(100), last_name)
            .input('email', sql.VarChar(100), email)
            .input('phone_nbr', sql.Int, phone_nbr)
            .input('password', sql.VarChar(200), hashedPassword)
            .input('Role_id', sql.Int, Role_id || 1)
            .query(`
                INSERT INTO Users
                (
                    first_name,
                    last_name,
                    email,
                    phone_nbr,
                    password,
                    Role_id
                )
                VALUES
                (
                    @first_name,
                    @last_name,
                    @email,
                    @phone_nbr,
                    @password,
                    @Role_id
                )
            `);

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {

        console.error('Registration Failed:', error);

        res.status(500).json({
            message: 'An error occurred while registering the user'
        });
    }
});

module.exports = router;

