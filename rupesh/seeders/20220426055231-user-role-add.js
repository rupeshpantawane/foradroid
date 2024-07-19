'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_roles', [
      { role: 'Admin', created_at: new Date() },
      { role: 'Guest', created_at: new Date() },
      { role: 'Maneger', created_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user_roles', null, {});
  }
};
