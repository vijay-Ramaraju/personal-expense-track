const Transaction = require("../models/transactionModel");

// Add a new transaction
const addTransaction = async (req, res) => {
  const { type, category, amount, date, description } = req.body;
  const transaction = new Transaction({
    type,
    category,
    amount,
    date,
    description,
    user: req.user._id, // Link the transaction to the user
  });

  try {
    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { type, category, amount, date, description } = req.body;

  try {
    const transaction = await Transaction.findById(id);
    if (
      !transaction ||
      transaction.user.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.type = type || transaction.type;
    transaction.category = category || transaction.category;
    transaction.amount = amount || transaction.amount;
    transaction.date = date || transaction.date;
    transaction.description = description || transaction.description;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await Transaction.findById(id);
    if (
      !transaction ||
      transaction.user.toString() !== req.user._id.toString()
    ) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.remove();
    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
