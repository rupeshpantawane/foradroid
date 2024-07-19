'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SimpleCrud extends Model {
    static associate(models) {
    }
  }
  SimpleCrud.init({
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'SimpleCrud',
    tableName: "simple_cruds",
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true, //use for soft delete with using deleted_at
    underscored: true //making underscored colomn as deletedAt to deleted_at

  });
  return SimpleCrud;
};