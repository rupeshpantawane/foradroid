"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const app = require('../services/app.service');
// const config = require(__dirname + '/../config/config.json')[app['env']];

// const confighh = require('../config/config.json')
// console.log(config,confighh.production)
const db = {};
const database ="product"
const username ="root"
const password =""
const configf = {
  "username": "root",
  "password": "",
  "database": "product",
  "host": "",
  "port": 3306,
  "dialect": "mysql",
  "logging": false,
  "poll": {
    "max": 5,
    "min": 0,
    "idle": 10000
  } 
}

var sequelize = new Sequelize(
  database,
  username,
  password,
  configf
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;

module.exports = db;
