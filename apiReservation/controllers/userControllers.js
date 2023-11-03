const models = require('../models/index');
const Reservation = models.Reservation;
const User = models.User;

const getAllUsers = async (req, res) => {
  const allUsers = await User.findAll({});
  res.json(allUsers);
};


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        
        console.log(id);
        // Rechercher les users en fonction de son id
        const users = await User.findAll({
          where: { id }
        });
    
        if (users.length === 0) {
          return res.status(404).json({ error: 'Aucun utilisateur trouvé pour ce numéro de user' });
        }
    
        // Répondre avec les users trouvés
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la recherche des users' });
      }
};

const createUsers = async (req, res) => {
    try {
        // Récupérer les données du corps de la demande
        const {
          nom,
          prenom,
          email,
          birthday
        } = req.body;
    
        // Créer un nouveau user en utilisant le modèle Sequelize
        const newUser = await User.create({
            nom,
            prenom,
            email,
            birthday
        });
    
        // Répondre avec le nouveau user créé
        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du user' });
      }
};


module.exports = { getAllUsers, getUserById, createUsers, };



