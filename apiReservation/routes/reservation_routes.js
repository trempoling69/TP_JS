const express = require('express');
const router = express.Router();

const { getAllReservation, createReservation, canceledReservation } = require('../controllers/reservationControllers');

router.get('/', getAllReservation);

router.post('/', createReservation);

router.put('/:id', canceledReservation);

module.exports = router;
