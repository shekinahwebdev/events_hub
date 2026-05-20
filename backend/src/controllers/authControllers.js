const { PrismaClient } = require("@prisma/client/extension");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const primsa = new PrismaClient();

// Short-lived Access Token (for authorizing API calls)
const buildAccesToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "20m",
  });

// Long-lived Refresh Token (for getting a new access token)
const buildRefreshToken = (userId) =>
  jwt.sign({ userId }, process.env.REFESH_SECRET, {
    expiresIn: "7d",
  });

const register = async (req, res) => {
  try {
    // send credientials
    const { email, password } = req.body;

    // check if credentials aren't inputted
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const normalizedEmail = email.toLowerCase();

    // checking for exisiting user
    const exisitingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (exisitingUser) {
      return res.status(409).json({ message: "User alredeay exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    //GENERATE BOTH TOKENS
    const accessToken = buildAccessToken(user.id);
    const refreshToken = buildRefreshToken(user.id);

    //Send Refresh Token in a secure HttpOnly cookie
    // so client-side JavaScript can't steal it, and send Access Token in JSON.
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days matching token expiry
    });

    // Send the access token and non-sensitive user details back to Next.js
    return res.status(201).json({
      message: "Account created successfully",
      accessToken,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not create account.", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    // send credientials
    const { email, password } = req.body;

    // check if credentials aren't inputted
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }
    const normalizedEmail = email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    const accessToken = buildAccessToken(user.id);
    const refreshToken = buildRefreshToken(user.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const accessToken = buildAccessToken(user.id);
    const refreshToken = buildRefreshToken(user.id);

    // Send Refresh Token in a secure HttpOnly cookie
    // so client-side JavaScript can't steal it, and send Access Token in JSON.
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send the access token and non-sensitive user details back to Next.js
    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not login.", error: error.message });
  }
};

const refresh = async (req, res) => {
  try {
    // Grab the refresh token from the parsed cookies locker
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token missing. Please log in." });
    }

    // Verify the cryptographic signature of the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired refresh token." });
      }

      // Issue a fresh access token using the decoded user ID from the payload
      const accessToken = buildAccessToken(decoded.userId);

      return res.status(200).json({
        accessToken,
      });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Could not refresh token.", error: error.message });
  }
};

module.exports = { login, register, refresh };
