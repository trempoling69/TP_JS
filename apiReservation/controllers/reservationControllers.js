const models = require('../models/index');
const Reservation = models.Reservation;
const User = models.User;

const getAllReservation = async (req, res) => {
  const allReservation = await Reservation.findAll({ include: [{model: User}] });
  res.json(allReservation);
};

module.exports = { getAllReservation };
