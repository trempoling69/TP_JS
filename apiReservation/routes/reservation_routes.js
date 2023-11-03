const express = require('express');
const router = express.Router();

const { getAllReservation, createReservation } = require('../controllers/reservationControllers');

router.get('/', getAllReservation);

router.post('/', createReservation);

module.exports = router;