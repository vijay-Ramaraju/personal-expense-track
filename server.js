const express = require("express");
const connectDB = require("./config/db");
const transactionRoutes = require("./routes/transactionRoutes");
require("dotenv").config();

const app = express();


app.use(express.json());


connectDB();


app.use("/api", transactionRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
