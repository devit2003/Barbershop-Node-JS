const express = require('express');
const router = express.Router();
const { getLowStockReport, getSummaryReport } = require('../controllers/reportController');

// Endpoint untuk laporan stok dan summary
router.get('/low-stock', getLowStockReport);
router.get('/summary', getSummaryReport);

module.exports = router;
