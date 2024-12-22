module.exports = (req, res, next) => {
    const { name, category, quantity, price } = req.body;

    if (!name || !category || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (quantity < 1) {
        return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    if (price < 0) {
        return res.status(400).json({ message: 'Price cannot be negative' });
    }

    next();
};
