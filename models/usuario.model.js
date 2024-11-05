const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre del usuario es obligatorio"],
            trim: true
        },

        apellido: {
            type: String,
            required: [true, "El apellido del usuario es obligatorio"],
            trim: true
        },

        correo: {
            type: String,
            required: [true, "El correo del usuario es obligatorio"],
            trim: true
        },

        edad: {
            type: Number, // Cambiar a Number
            required: [true, "La edad del usuario es obligatoria"], // Corregir "El edad" a "La edad"
            trim: true
        },        
    },
    { timestamps: true }
)

module.exports = mongoose.model('Usuario', UserSchema);
