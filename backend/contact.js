const express=require('express');
const router=express.Router();
const {sql, poolPromise } = require('./database');

router.post('/contact', async (req, res) => {
      try {
            const{
                  full_name,
                  email,
                  phone_nbr,
                  subjects,
                  message,
                  Role_id
            } = req.body;
            const pool= await poolPromise;
            const result= await pool.request()
                  .input('full_name', sql.VarChar(100), full_name)
                  .input('email', sql.VarChar(100), email)
                  .input('phone_nbr', sql.Int, phone_nbr)
                  .input('subjects', sql.VarChar(200), subjects)
                  .input('message', sql.VarChar(sql.MAX), message)
                  .input('Role_id', sql.Int, 1)
                  .query('INSERT INTO Users (full_name, email, phone_nbr, subjects, message, Role_id)VALUES (@full_name, @email, @phone_nbr, @subjects, @message, @Role_id)');
            res.status(200).json({ message: 'Contact form submitted successfully' });
      } catch (error) {
            console.error('Error submitting contact form:', error);
            res.status(500).json({ message: 'An error occurred while submitting the contact form' });
      }     
});

module.exports=router;