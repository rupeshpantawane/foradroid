'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('system_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      }, 
      tab: {
        type: Sequelize.ENUM('GENERAL', 'SMTP'),
        allowNull: false,
      },
      config_key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      config_value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      form_controls_type: {
        type: Sequelize.ENUM('INPUT', 'SELECT','TEXTAREA'),
        allowNull: false,
      },
      select_options: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_required: {
        allowNull: true,
        type: Sequelize.TINYINT(1),
        defaultValue: 1
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true, 
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('system_settings');
  }
};