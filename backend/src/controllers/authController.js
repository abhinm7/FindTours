import jwt from 'jsonwebtoken';

// Auth admin & get token

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Check against .env variables
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {

    // Create a token
    const token = jwt.sign(
      { id: 'admin_user', isAdmin: true }, // payload
      process.env.JWT_SECRET, // The secret key
      { expiresIn: '1d' } // Token expires in 1 day
    );
    
    if(token){
      console.log("token created succesfully")
    }
    res.json({
      message: "Login successful",
      token,
    });

  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

//verify token
export const verifyToken = (req, res) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(400).json({
      valid: false,
      message: "missing",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      valid: true,
      message: "valid",
      admin: decoded,
    });

  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        valid: false,
        message: "expired",
      });
    }

    return res.status(401).json({
      valid: false,
      message: "invalid",
    });
  }
};
