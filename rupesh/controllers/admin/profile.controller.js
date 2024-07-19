var { User } = require("../../models");
const authService = require("../../services/auth.service");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op } = require("sequelize");
const CONFIG = require("../../config/config.json");

const updateProfile = async function (req, res) {
    try {
        let user_id = req.user.id;
        let body = req.body;
        const userNameUpdate = await User.update({
        name: body.name
        }, {
        where: {
            id: user_id,
        },
        });
        if (!userNameUpdate) {
        return ReE(res, { message: "No data found" }, 200);
        }
        return ReS(res, { message: "Profile updated successfully" });
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};



const updateLanguage = async function (req, res) {
    try {
        let user_id = req.user.id;
        let body = req.body;
        const userNameUpdate = await User.update({
            language: body.language,
            updated_at: new Date()
        }, {
        where: {
            id: user_id,
        },
        });
        if (!userNameUpdate) {
        return ReE(res, { message: "No data found" }, 200);
        }
        return ReS(res, { message: "Language updated successfully" });
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};


const changePassword = async function (req, res) {
 try {
        let user_id = req.user.id;
        let body = req.body;
        const saltRounds = 10;

        let checkUser = await User.findOne({
        where: {
        id: user_id
        }
        });

        const result = await bcrypt_p.compare(body.old_password, checkUser.password)
        if (!result) return ReE(res, { message: "Invalid old password." }, 400);

        const userPasswordUpdate = await User.update({
        password: bcrypt.hashSync(body.password, saltRounds)
        }, {
        where: {
        id: user_id,
        },
        });
        if (!userPasswordUpdate) {
        return ReE(res, { message: "No data found" }, 200);
        }
        return ReS(res, { message: "Password updated successfully" });
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

module.exports = {
    updateProfile,
    changePassword,
    updateLanguage
};
