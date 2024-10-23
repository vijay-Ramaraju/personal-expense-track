const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

// Get report of transactions by category
const getReportByCategory = async (req, res) => {
  try {
    const transactions = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get monthly summary
const getMonthlySummary = async (req, res) => {
  try {
    const monthlySummary = await Transaction.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { _id: -1 } }, // Sort by month descending
    ]);

    res.json(monthlySummary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReportByCategory,
  getMonthlySummary,
};
