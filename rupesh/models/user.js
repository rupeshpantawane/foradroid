"use strict";
const { TE, to } = require("../services/util.service");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      line_id: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      license_number: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: { model: "companies", key: "id" },
        onDelete: "CASCADE",
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mobile: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        allowNull: true,
        type: DataTypes.TINYINT(1),
        defaultValue: 1
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: { model: "user_roles", key: "id" },
        onDelete: "CASCADE",
        allowNull: false,
        comment: "is defined for the login perminssion"
      },
      language: {
        type: DataTypes.ENUM('en','th'),
        allowNull: false,
        defaultValue: 'en',
      },
      is_accept_termsandcondition: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true, //use for soft delete with using deleted_at
      underscored: true //making underscored colomn as deletedAt to deleted_at
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.UserRole, {
      sourceKey: 'id',
      foreignKey: 'role_id',
      constraints: false,
      as: 'UserRole'
    });
  }

  return User;
};
