const express = require('express');
const router = express.Router();

const { getAllFlight, createFlight, updateFlight, deleteFlight, getFlightByNumber, getStatutSeat } = require('../controllers/controllerVol');

router.get('/', getAllFlight);


router.post('/', createFlight);

  
router.put('/:id', updateFlight); 


router.delete('/:id', deleteFlight);


router.get('/:flightNumber', getFlightByNumber );


router.get('/:flightNumber/seats/:seatName', getStatutSeat);
  

  



  
  
  

module.exports = router;