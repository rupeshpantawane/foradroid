'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "simple_cruds",
      [
        {
          first_name: "test fname",
          last_name: "test lname",
          created_at: new Date()
        },
        {
          first_name: "test1 fname",
          last_name: "test1 lname",
          created_at: new Date()
        },
        {
          first_name: "test2 fname",
          last_name: "test2 lname",
          created_at: new Date()
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
   
  }
};
