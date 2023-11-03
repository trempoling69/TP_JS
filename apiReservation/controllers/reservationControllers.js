const axios = require('axios');
const models = require('../models/index');
const Reservation = models.Reservation;
const User = models.User;

//Recupération de toutes les reservation
const getAllReservation = async (req, res) => {
  const allReservation = await Reservation.findAll({ include: [{ model: User }] });
  res.json(allReservation);
};

//creation d'une reservation
const createReservation = async (req, res) => {
  try {
    // Récupérer les données du corps de la demande
    const { user_id, flightNumber, seatNumber } = req.body;

    // Effectuer une requête HTTP au serveur de vols pour vérifier la disponibilité du vol
    const flightResponse = await axios.get(`http://localhost:3000/api/flight/${flightNumber}`);

    //verifier que le vol existe bien sinon envoyer une erreur
    if (flightResponse.data.error) {
      return res.status(200).json({ error: 'Vol non trouvé' });
    }

    // Vérifier la disponibilité du siège
    const seats = flightResponse.data[0].sieges.sieges;
    const seatToBook = seats.find((seat) => seat.name === seatNumber);
    if (!seats || !seatToBook || seatToBook.statut === 'indisponible') {
      return res.status(400).json({ error: "Le siège n'est pas disponible" });
    }

    // Créer une nouvelle reservation en utilisant le modèle Sequelize
    const newReservation = await Reservation.create({
      user_id,
      flightNumber,
      seatNumber,
      statut: 'VALIDATE',
    });

    //utiliser l'api de vol pour modifier le siège sur le vol en question
    await axios.put(`http://localhost:3000/api/flight/${flightNumber}/seats/${seatNumber}`, {
      name: `${seatNumber}`,
      statut: 'indisponible',
    });
    // Répondre avec la nouvelle reservation créée
    res.status(201).json(newReservation);
  } catch (error) {
    //catch d'erreur en cas d'erreur
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création d'une reservation" });
  }
};

//annulation d'une reservation
const canceledReservation = async (req, res) => {
  try {
    //recupération de l'id dans la requête
    const idReservation = req.params.id;
    //recupération de la reéservation à canceled
    const reservationToCancel = await Reservation.findByPk(idReservation);

    const flightNumber = reservationToCancel.flightNumber;
    const seatNumber = reservationToCancel.seatNumber;

    //utiliser l'api de vol pour modifier le siège sur le vol en question
    //rendre dispo de nouveau le siège
    await axios.put(`http://localhost:3000/api/flight/${flightNumber}/seats/${seatNumber}`, {
      name: `${seatNumber}`,
      statut: 'disponible',
    });

    //changer le statut de la réservation en canceled
    reservationToCancel.statut = 'CANCELED';
    const newReservation = await reservationToCancel.save();

    //envoyer la nouvelle reservation en réponse
    res.status(200).json(newReservation);
  } catch (error) {
    //catch erreur
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création d'une reservation" });
  }
};

module.exports = { getAllReservation, createReservation, canceledReservation };
