const express = require('express');
const router = express.Router();

const { getAllFlight } = require('../controllers/controllerVol');

router.get('/', getAllFlight);

module.exports = router;