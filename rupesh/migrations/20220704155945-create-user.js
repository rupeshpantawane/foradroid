"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      line_id: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: true,
      },
      license_number: {
        type: Sequelize.STRING,
        allowNull: true,
        // unique: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      email: {  
        type: Sequelize.STRING,
        allowNull: true,
        // unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mobile: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        allowNull: true,
        type: Sequelize.TINYINT(1),
        defaultValue: 1
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: { model: "user_roles", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
        comment: "is defined for the login perminssion"
      },
      language: {
        type: Sequelize.ENUM('en','th'),
        allowNull: false,
        defaultValue: 'en',
      },
      is_accept_termsandcondition: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
