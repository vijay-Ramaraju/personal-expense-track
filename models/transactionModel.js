const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the User
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
