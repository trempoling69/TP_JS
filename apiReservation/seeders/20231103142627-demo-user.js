'use strict';

/** @type {import('sequelize-cli').Migration} */

const models = require('../models/index');
const User = models.User;
module.exports = {
  async up (queryInterface, Sequelize) {

    return User.bulkCreate([
      {
        prenom: 'john',
        nom: 'Doe',
        email: 'john@email.com',
        birthday: '1970-10-10'
      },
      {
        prenom: 'james',
        nom: 'Smith',
        email: 'james@email.com',
        birthday: '1980-08-25'
      },
      {
        prenom: 'David',
        nom: 'oui',
        email: 'David@email.com',
        birthday: '2000-02-15'
      },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return Vol.destroy({ where: {} });
  }
};
