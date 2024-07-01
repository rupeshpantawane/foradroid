'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.STRING
    },
    discount_percentage: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    stock: {
      type: DataTypes.STRING
    },
    brand: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: "products",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true,
    underscored: true //making underscored colomn as createdAt to created_at
  });
  return Product;
};