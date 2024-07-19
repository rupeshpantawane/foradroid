'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserRole.init({
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role_status: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
      allowNull: false
    },
    added_by: { type: DataTypes.INTEGER, allowNull: true },
  }, {
    sequelize,
    modelName: 'UserRole',
    tableName: 'user_roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    underscored: true
  });
  return UserRole;
};