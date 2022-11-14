'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'admin',
          email: 'admin@mail.com',
          password: await bcrypt.hash('12345678', 10),
          role: 'admin',
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'user',
          email: 'user@mail.com',
          password: await bcrypt.hash('12345678', 10),
          role: 'user',
          active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'car_categories',
      [
        {
          name: 'A',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'B',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'tags',
      [
        {
          name: 'A',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'B',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
