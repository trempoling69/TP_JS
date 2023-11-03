'use strict';

/** @type {import('sequelize-cli').Migration} */

const models = require('../models/index');
const Vol = models.Vol;
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return Vol.bulkCreate([
      {
        flightNumber: 'ABC123',
        origine: 'Paris',
        destination: 'New York',
        date: '2023-11-03',
        sieges: {
          sieges: [
            { name: 'A1', statut: 'indisponible' },
            { name: 'A2', statut: 'indisponible' },
            { name: 'A3', statut: 'disponible' },
          ],
        },
        informationAeroplane: { model: 'Boeing 747', capacity: 160 },
      },
      {
        flightNumber: 'DEF456',
        origine: 'London',
        destination: 'Tokyo',
        date: '2023-11-04',
        sieges: {
          sieges: [
            { name: 'A1', statut: 'disponible' },
            { name: 'A2', statut: 'disponible' },
            { name: 'A3', statut: 'disponible' },
          ],
        },
        informationAeroplane: { model: 'Airbus A380', capacity: 208 },
      },
      {
        flightNumber: 'GHI789',
        origine: 'New York',
        destination: 'Los Angeles',
        date: '2023-11-05',
        sieges: {
          sieges: [
            { name: 'A1', statut: 'indisponible' },
            { name: 'A2', statut: 'disponible' },
            { name: 'A3', statut: 'disponible' },
          ],
        },
        informationAeroplane: { model: 'Boeing 787', capacity: 192 },
      },
      {
        flightNumber: 'JKL101',
        origine: 'Tokyo',
        destination: 'Sydney',
        date: '2023-11-06',
        sieges: {
          sieges: [
            { name: 'A1', statut: 'indisponible' },
            { name: 'A2', statut: 'disponible' },
            { name: 'A3', statut: 'indisponible' },
          ],
        },
        informationAeroplane: { model: 'Airbus A350', capacity: 234 },
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return Vol.destroy({ where: {} });
  },
};
