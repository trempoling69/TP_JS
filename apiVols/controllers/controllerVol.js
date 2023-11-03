const models = require('../models/index');
const Vol = models.Vol;

const getAllFlight = async (req, res) => {
  const allFlight = await Vol.findAll({});
  res.json(allFlight);
};

const getFlightByNumber = async (req, res) => {
  try {
    const flightNumber = req.params.flightNumber;

    // Rechercher les vols en fonction du numéro de vol
    const vols = await Vol.findAll({
      where: { flightNumber }
    });

    if (vols.length === 0) {
      return res.status(404).json({ error: 'Aucun vol trouvé pour ce numéro de vol' });
    }

    // Répondre avec les vols trouvés
    res.json(vols);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la recherche des vols' });
  }
};

const createFlight = async (req, res) => {
  try {
    // Récupérer les données du corps de la demande
    const {
      flightNumber,
      origine,
      destination,
      date,
      sieges,
      informationAeroplane
    } = req.body;

    // Créer un nouveau vol en utilisant le modèle Sequelize
    const newVol = await Vol.create({
      flightNumber,
      origine,
      destination,
      date,
      sieges,
      informationAeroplane
    });

    // Répondre avec le nouveau vol créé
    res.status(201).json(newVol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création du vol' });
  }
};

const updateFlight = async (req, res) => {
  try {
    const volId = req.params.id;

    // Rechercher le vol existant en fonction de son ID
    const existingVol = await Vol.findByPk(volId);

    if (!existingVol) {
      return res.status(404).json({ error: 'Vol non trouvé' });
    }

    // Mettre à jour les données du vol en utilisant les données du corps de la demande
    const {
      flightNumber,
      origine,
      destination,
      date,
      sieges,
      informationAeroplane
    } = req.body;

    existingVol.flightNumber = flightNumber;
    existingVol.origine = origine;
    existingVol.destination = destination;
    existingVol.date = date;
    existingVol.sieges = sieges;
    existingVol.informationAeroplane = informationAeroplane;

    // Enregistrer les modifications dans la base de données
    await existingVol.save();

    // Répondre avec le vol mis à jour
    res.json(existingVol);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du vol' });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const volId = req.params.id;

    // Rechercher le vol existant en fonction de son ID
    const existingVol = await Vol.findByPk(volId);

    if (!existingVol) {
      return res.status(404).json({ error: 'Vol non trouvé' });
    }

    // Supprimer le vol de la base de données
    await existingVol.destroy();

    // Répondre avec un message de succès
    res.json({ message: 'Vol supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression du vol' });
  }
}

const getStatutSeat = async (req, res) => {
  try {
    const flightNumber = req.params.flightNumber;
    const seatName = req.params.seatName;

    // Rechercher le vol en fonction du numéro de vol
    const vol = await Vol.findOne({
      where: { flightNumber }
    });

    if (!vol) {
      return res.status(404).json({ error: 'Vol non trouvé' });
    }

    // Vérifier si le siège existe dans le vol
    const siegeArray = JSON.parse(vol.sieges).sieges;

    console.log(siegeArray);
    const getsiegeinarray = siegeArray.find((siege) => siege.name === seatName);
    if (!siegeArray || !getsiegeinarray ) {
      return res.status(404).json({ error: 'Siège non trouvé dans ce vol' });
    }

    // Répondre avec les informations du siège
    res.json({
      flightNumber: vol.flightNumber,
      ...getsiegeinarray
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la recherche du siège' });
  }
}


module.exports = { getAllFlight, createFlight, updateFlight, deleteFlight, getFlightByNumber, getStatutSeat };
