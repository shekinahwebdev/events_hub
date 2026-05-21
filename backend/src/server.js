require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const cookieParser = require("cookie-parser");
const prisma = require("./db");

const app = express();
const port = process.env.PORT || 5001;
// const port = 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// health check on endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// fallback route for missing endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// create a server
const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in the environment variables");
    }

    console.log("Connecting to postgres database...");
    await prisma.$connect();
    console.log("Database is connected successfully");

    app.listen(port, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
