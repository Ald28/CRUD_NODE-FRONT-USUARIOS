const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/usuario.route');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

// Routes
app.use("/api/usuarios", userRoute);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});

// Conectar a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crud-node')
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });
