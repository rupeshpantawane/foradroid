'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        //allowNull: true,
        //references: { model: "admin_modules", key: "id" }
        allowNull: true,
        // references: { model: "admin_modules", key: "id" }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      route: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      action: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_dropdown: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: false

      },
      is_readonly: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: false
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_modules');
  }
};