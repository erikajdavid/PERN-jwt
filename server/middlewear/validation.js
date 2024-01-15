const validation = (req, res, next) => {
    const { email, name, password } = req.body;
  
    //validate email format
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    //validate register user input
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json({ message: "Missing Credentials. All iput fields are required." });
      } else if (!validEmail(email)) {
        return res.status(401).json({ message: "Invalid email format." });
      } else if (password.length < 8) {
        return res.status(401).json({ message: "Password must be at least 8 characters long." });
    }

    //validate login user input
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json({ message: "Missing Credentials. All iput fields are required." });
      } else if (!validEmail(email)) {
        return res.status(401).json({ message: "Invalid email format." });
      }
    }
  
    next();
  };

  module.exports = validation;