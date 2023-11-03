const axios = require('axios');
const models = require('../models/index');
const Reservation = models.Reservation;
const User = models.User;

const getAllReservation = async (req, res) => {
  const allReservation = await Reservation.findAll({ include: [{model: User}] });
  res.json(allReservation);
};

const createReservation = async (req, res) => {
  try {
    // Récupérer les données du corps de la demande
    const {
      user_id,
      flightNumber,
      seatNumber
    } = req.body;

    // Effectuer une requête HTTP au serveur de vols pour vérifier la disponibilité du vol
    const flightResponse = await axios.get(`http://localhost:3000/api/flight/${flightNumber}`);

    if (flightResponse.status !== 200) {
      return res.status(404).json({ error: 'Vol non trouvé' });
    }

    // Vérifier la disponibilité du siège
    const seats = flightResponse.data.sieges;
    if (!seats || !seats[seatNumber] || !seats[seatNumber].available) {
      return res.status(400).json({ error: 'Le siège n\'est pas disponible' });
    }

    // Créer un nouveau reservation en utilisant le modèle Sequelize
    const newReservation = await Reservation.create({
      user_id,
      flightNumber,
      seatNumber,
    });

    // Répondre avec le nouveau reservation créé
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création d\'une reservation' });
  }
};



module.exports = { getAllReservation, createReservation, };
