const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, createUsers } = require('../controllers/userControllers');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.post('/', createUsers);

module.exports = router;