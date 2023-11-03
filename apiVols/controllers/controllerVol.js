const models = require('../models/index');
const Vol = models.Vol;

const getAllFlight = async (req, res) => {
  const allFlight = await Vol.findAll({});
  res.json(allFlight);
};

module.exports = { getAllFlight };
