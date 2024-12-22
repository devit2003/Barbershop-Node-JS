const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const validationMiddleware = require('./middlewares/validationMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('./db/connection'); 

dotenv.config();

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Middleware untuk parsing JSON dan CORS
app.use(express.json());
app.use(cors());

// Routing untuk autentikasi
app.use('/auth', authRoutes);

// Middleware untuk autentikasi pada route berikutnya
app.use(authMiddleware);

// Routing untuk item dan report
app.use('/items', validationMiddleware, itemRoutes);
app.use('/reports', reportRoutes);

// Middleware error handling
app.use(errorMiddleware);

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
