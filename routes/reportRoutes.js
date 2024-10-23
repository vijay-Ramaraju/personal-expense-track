const express = require("express");
const {
  getReportByCategory,
  getMonthlySummary,
} = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect); // Protect all routes after this middleware

router.get("/category", getReportByCategory);
router.get("/monthly", getMonthlySummary);

module.exports = router;
