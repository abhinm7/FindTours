import jwt from 'jsonwebtoken';

// Auth admin & get token

export const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  // Check against our .env variables
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

    res.json({
      message: "Login successful, booboo!",
      token,
    });

  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};