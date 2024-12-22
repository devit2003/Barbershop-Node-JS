const db = require('../db/connection');

exports.createItem = (req, res) => {
    const { name, category, quantity, price } = req.body;

    if (!name || !category || !quantity || !price) {
        return res.status(400).json({ message: "All fields are required" });
    }

    db.query('INSERT INTO items (name, category, quantity, price) VALUES (?, ?, ?, ?)', [name, category, quantity, price], (err) => {
        if (err) return res.status(500).json({ message: 'Error adding item', error: err });
        res.status(201).json({ message: 'Item created successfully' });
    });
};


exports.getItems = (req, res) => {
    const { category, page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const sql = category ? 'SELECT * FROM items WHERE category = ? LIMIT ? OFFSET ?' : 'SELECT * FROM items LIMIT ? OFFSET ?';
    const params = category ? [category, limit, offset] : [limit, offset];

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching items', error: err });
        res.json(results);
    });
};

exports.getItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM items WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching item', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Item not found' });
        res.json(results[0]);
    });
};

exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, category, quantity, price } = req.body;

    db.query('UPDATE items SET name = ?, category = ?, quantity = ?, price = ? WHERE id = ?', [name, category, quantity, price, id], (err) => {
        if (err) return res.status(500).json({ message: 'Error updating item', error: err });
        res.json({ message: 'Item updated successfully' });
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting item', error: err });
        res.json({ message: 'Item deleted successfully' });
    });
};
