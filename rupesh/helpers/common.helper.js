const CONFIG = require("../config/config.json");
const APP = require("../config/app.json");

const { SystemSetting } = require("../models");
const { to, TE, ReE } = require("../services/util.service");
const { Op } = require("sequelize");

const commonLanguage = async function (req, res) {
  try {
    // console.log(req.header('Accept-Language'));
    // console.log(config_key)
    const systemSetting = await SystemSetting.findOne({
      where: { config_key: config_key ? config_key : null },
    });
    if (!systemSetting) {
      return "en";
      // return ReE(res, { message: "No Data Found" }, 200);
    }
    return systemSetting.config_value;
  } catch (error) {
    console.log(error.message);
  }
};

const base64Encode = async (value) => {
  let base64 = "";
  if (value) {
    base64 = Buffer.from(`${value}`).toString("base64");
  }
  return base64;
};

const base64Decode = async (value) => {
  return Buffer.from(value, "base64").toString("ascii");
};

module.exports = {
  commonLanguage,
  base64Encode,
  base64Decode
};
