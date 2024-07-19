'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SystemSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    } 
  }
  SystemSetting.init({
    tab: {
      type: DataTypes.ENUM('GENERAL', 'SMTP'),
      allowNull: false,
    },
    config_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    config_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    form_controls_type: {
      type: DataTypes.ENUM('INPUT', 'SELECT','TEXTAREA'),
      allowNull: false,
    },
    select_options: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_required: {
      allowNull: true,
      type: DataTypes.TINYINT(1),
      defaultValue: 1
    }
  }, {
    sequelize,
      modelName: "SystemSetting",
      tableName: "system_settings",
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true, //use for soft delete with using deleted_at
      underscored: true //making underscored colomn as deletedAt to deleted_at
  });

  SystemSetting.associate = function (models) {
    SystemSetting.hasMany(SystemSetting, { as: 'childrens', foreignKey: 'tab', sourceKey: 'tab' });
  };
  return SystemSetting;
};