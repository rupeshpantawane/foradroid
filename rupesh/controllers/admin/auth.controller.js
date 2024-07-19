var { User, SystemSetting, UserRole } = require("../../models");
const authService = require("../../services/auth.service");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const bcrypt_p = require('bcrypt-promise');
const CONFIG = require("../../config/config.json");
const jwt = require("jsonwebtoken");

const login = async function (req, res) {
  const body = req.body;
  let checkUser = await User.findOne({
    where: {
      email: body.email
    }
  });

  if (!checkUser) return ReE(res, { message: "Please enter the registered email address." }, 400);

  const result = await bcrypt_p.compare(body.password, checkUser.password)
  if (!result) return ReE(res, { message: "Invalid password." }, 400);
  const token = jwt.sign({ user_id: checkUser.id, email: checkUser.email, user_type: 'admin' }, CONFIG.jwt_encryption, { expiresIn: '365d' });

  let userData = await User.findOne({
    include: [
      {
        model: UserRole,
        as: 'UserRole',
        attributes: [
            'id','role'
        ],
        required: true
      }
    ],
    where: {
      email: body.email
    },
    attributes: {
      include: [],
      exclude: ['password']
    }
  });

  let settings = await SystemSetting.findAll({
    attributes: ['config_key','config_value'],
  });
  var obj = {};
  for (var i = 0; i < settings.length; i++) {
    obj[settings[i]['config_key']] = settings[i]['config_value'];
  } 
  return ReS(res, { user: userData, token: token, settings:obj  });
};

module.exports = {
  login
};
