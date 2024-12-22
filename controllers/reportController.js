const db = require('../db/connection');

exports.getLowStockReport = (req, res) => {
    db.query('SELECT * FROM items WHERE quantity < 5', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching report', error: err });
        res.json(results);
    });
};

exports.getSummaryReport = (req, res) => {
    db.query('SELECT category, COUNT(*) AS total_items FROM items GROUP BY category', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching summary', error: err });
        res.json(results);
    });
};
