'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emp extends Model {
    static associate(models) {
    }
  }
  Emp.init({
    first_name: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.INTEGER
    },
    sold: {
      type: DataTypes.INTEGER
    }      
  }, {
    sequelize,
    modelName: 'Emp',
    tableName: 'Emps',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
  });
  return Emp;
};