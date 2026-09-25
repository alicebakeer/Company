const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { sql, poolPromise } = require('./database');

router.post('/Login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const pool = await poolPromise;

        const result = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query(`
                SELECT
                    users_id,
                    first_name,
                    last_name,
                    email,
                    phone_nbr,
                    password,
                    Role_id
                FROM Users
                WHERE email = @email
                  AND Role_id IN (1, 2)
            `);

        if (result.recordset.length === 0) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const user = result.recordset[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            {
                users_id: user.users_id,
                email: user.email,
                Role_id: user.Role_id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const message =
            user.Role_id === 2
                ? 'Admin login successfully'
                : 'User login successfully';

        res.status(200).json({
            message: message,
            token: token,
            user: {
                users_id: user.users_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_nbr: user.phone_nbr,
                Role_id: user.Role_id
            }
        });

    } catch (error) {
        console.error('Login Failed:', error);

        res.status(500).json({
            message: 'An error occurred while logging in'
        });
    }
});

module.exports = router;