'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolePermission.init({
   
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user_roles", key: "id" },
      onDelete: "CASCADE",
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "role_modules", key: "id" },
      onDelete: "CASCADE",
    },
    is_read: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      allowNull: false
    },
    is_create: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      allowNull: false
    },
    is_edit: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      allowNull: false
    },
    is_delete: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
    tableName: 'role_permissions',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  });

  // RolePermission.associate = function (models) {
  //   RolePermission.hasMany(RolePermission, { as: 'childrens', foreignKey: 'parent_id', sourceKey: 'id' });
  // };

 
  return RolePermission;
}; 
