const express = require("express");
const router = express.Router();
const pool = require("../db");

//registering

router.post("/register", async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;
       
        //2. check that all fields have been filled
        if (!name || !email || !password) {
            return res.status(400).send(`All fields are required`);
        }

        //3. check if the user exists via email
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //if user exists throw an error
        if (user.rows[0]) {
            return res.status(401).send(`User already exists.`);
        }
        
        //if user doesn't exist, continue with the process
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send(`Server error.`);
    }
});

module.exports = router;