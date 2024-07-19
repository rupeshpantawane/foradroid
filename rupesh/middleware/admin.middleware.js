const { User } = require('../models');
const { to, ReE } = require('../services/util.service');

let checkUser = async function (req, res, next) {

    let user, err;
    [err, user] = await to(User.findOne({ where: { id: req.user.id } }));
    if (err) return ReE(res, { static_key: 'UNAUTHORIZED_USER', message: "Unauthorized user." }, 401);

    user = req.user;
    next();
}
module.exports.checkUser = checkUser;