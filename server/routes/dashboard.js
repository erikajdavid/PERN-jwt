const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middlewear/authorization");

router.get("/", authorization, async (req, res) => {
    try {
        //req.user has the payload from the authorization middlerwear
        //res.json(req.user)
        //user_name only because you don't want to return all the info, including the password

        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user]);

        res.json(user.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: `Server error.` });
    }
})
module.exports = router;