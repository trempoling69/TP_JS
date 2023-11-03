'use strict';

/** @type {import('sequelize-cli').Migration} */

const models = require('../models/index');
const Reservation = models.Reservation;
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
    return Reservation.bulkCreate([
      { user_id: 1, flightNumber: 'ABC123', seatNumber: 'A1', statut: 'VALIDATE' },
      { user_id: 2, flightNumber: 'ABC123', seatNumber: 'A2', statut: 'VALIDATE' },
      { user_id: 3, flightNumber: 'GHI789', seatNumber: 'A1', statut: 'VALIDATE' },
      { user_id: 1, flightNumber: 'JKL101', seatNumber: 'A1', statut: 'VALIDATE' },
      { user_id: 3, flightNumber: 'JKL101', seatNumber: 'A3', statut: 'VALIDATE' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return Reservation.destroy({ where: {} });
  },
};
