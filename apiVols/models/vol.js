'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vol.init({
    flightNumber: DataTypes.STRING,
    origine: DataTypes.STRING,
    destination: DataTypes.STRING,
    date: DataTypes.STRING,
    sieges: DataTypes.JSON,
    informationAeroplane: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Vol',
  });
  return Vol;
};