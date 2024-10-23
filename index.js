const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose"); // Remove if using SQLite
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const reportsRoutes = require("./routes/reportRoutes");

// Uncomment if using SQLite
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL);

const app = express();
app.use(express.json());

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/reports", reportsRoutes);

// Uncomment if using SQLite
// sequelize.authenticate()
//     .then(() => console.log('SQLite Connected'))
//     .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
