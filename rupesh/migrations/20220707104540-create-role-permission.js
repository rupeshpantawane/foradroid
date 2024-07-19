'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "user_roles", key: "id" },
        onDelete: "CASCADE",
      },
      module_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "role_modules", key: "id" },
        onDelete: "CASCADE",
      },
      is_read: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: false
      },
      is_create: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: false
      },
      is_edit: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
        allowNull: false
      },
      is_delete: {
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
    await queryInterface.dropTable('RolePermissions');
  }
};