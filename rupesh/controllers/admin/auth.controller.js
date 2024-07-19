var { User, SystemSetting, UserRole } = require("../../models");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op } = require("sequelize");

const login = async function (req, res) {
  const body = req.body;
  let checkUser = await User.findOne({
    where: {
      email: body.email
    }
  });

  if (!checkUser) return ReE(res, { message: "Please enter the registered email address." }, 400);

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
  return ReS(res, { user: userData,  settings:obj  });
};

module.exports = {
  login
};
