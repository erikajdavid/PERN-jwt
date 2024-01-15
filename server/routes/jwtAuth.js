const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validation = require("../middlewear/validation");
const authorization = require("../middlewear/authorization");

//registering

router.post("/register", validation, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;

        //2. check if the user exists via email
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //if user exists throw an error
        if (user.rows[0]) {
            return res.status(401).send(`User already exists.`);
        }

        //3. if user doesn't exist, continue with the process and crypt the password
        const saltRound = 10; //this makes the encryption stronger
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        
        //4. enter the new user into our pernjwt database

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *", [name, email, bcryptPassword]);

        //5. generate jwt access token;

        const accessToken = jwtGenerator(newUser.rows[0].user_id);

        res.json({ accessToken });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send(`Server error.`);
    }
});

//logging in

router.post("/login", validation, async (req, res) => {
    try {
        //1. destructure the req.body
        const { email, password } = req.body;

        //2. checek that user exists
        const existingUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //if user does not exist, throw an error
        if (existingUser.rows.length === 0) {
            return res.status(401).json({ message: `Wrong email or password.` });
        }

        //3. if the user exists, compare password with bcrypt password
        const passwordCorrect = await bcrypt.compare(password, existingUser.rows[0].user_password);

        if (!passwordCorrect) {
            return res.status(401).json({ message: `Unauthorized.` })
        }
        
        console.log(passwordCorrect);

        //4. if password is correct, generator access token upon sucessful login
        const accessToken = jwtGenerator(existingUser.rows[0].user_id);

        res.json({ accessToken });


    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal error.`)  
    }
});

router.get("/is-verify", authorization, async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.log(error.message)
        return res.status(500).send(`Internal error.`)  
    }
});

module.exports = router;