const express = require('express');
const router = express.Router();

const { getAllReservation } = require('../controllers/reservationControllers');

router.get('/', getAllReservation);

module.exports = router;