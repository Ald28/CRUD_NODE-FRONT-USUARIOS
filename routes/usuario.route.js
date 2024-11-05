const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/usuario.controller');

// Define routes
router.get('/', getUsers);         // GET /api/usuarios - Get all users
router.get('/:id', getUser);       // GET /api/usuarios/:id - Get user by ID
router.post('/', createUser);      // POST /api/usuarios - Create a new user
router.put('/:id', updateUser);    // PUT /api/usuarios/:id - Update user by ID
router.delete('/:id', deleteUser); // DELETE /api/usuarios/:id - Delete user by ID

module.exports = router;
