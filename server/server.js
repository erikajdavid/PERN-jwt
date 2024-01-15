require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8800

//middlewear
app.use(cors());
app.use(express.json()); //req.body (access client side data)

//ROUTES

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

//dashboard route

app.use("/dashboard", require("./routes/dashboard"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});