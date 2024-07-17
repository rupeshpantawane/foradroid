var { User, UserRelation } = require("../../models");
const { to, ReE, ReS, TE } = require("../../services/util.service");
const { Op, Sequelize } = require("sequelize");
const sequelize = new Sequelize('mysql://user:password@localhost:3306/mydb');
const CONFIG = require("../../config/config.json");
const app = require('../../services/app.service');
const config = require('../../config/app.json')[app['env']];
const getUserLogin = async function (req, res) {
    try {
        let body = req.body;
        let data = await User.findOne({
            attributes: [
                'id','gender'
            ],
            where: {
                id: body.id
            },
        });
        return ReS(res, { data: data, message: "success" });
    }
    catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};
const getUserRelation = async function (req, res) {
    try {
        let body = req.body;
        let data = await User.findAndCountAll({
            attributes: [
                'id', 'age', 'location', 'salary', 'location', 'caste', 'height',
                'education', 'marital_status', 'mobile', 'photo', 'gender', 'job','expectation'
            ],
            include: [
                {
                    model: UserRelation,
                    as: 'userList',
                    attributes: [
                        'user_id', 'user_id2', 'id1m', 'id1r', 'id1d', 'id2m', 'id2a'
                    ],
                    include: [
                        {
                            model: User,
                            as: 'userListRelation',
                            attributes: [
                                'id', 'age', 'location', 'salary', 'location', 'caste', 'height',
                                'education', 'marital_status', 'mobile', 'photo', 'gender', 'job','expectation'
                            ],
                            required: false,
                        }
                    ],
                    order: [
                        ['id', 'DESC']
                    ],
                    required: false,
                }
            ],
            where: {
                id: body.id
            },
        });
        return ReS(res, { data: data, message: "success" });
    }
    catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};
const createUserRelation = async function (req, res) {
    try {
        let body = req.body;
        const findData = await UserRelation.findOne({
            where: {
                user_id: body.user_id,
                user_id2: body.user_id2,
            }
        })
        if (findData) {
            return ReE(res, { message: "you both are already connected" }, 200);
        }
        else {
            const data = await UserRelation.create({
                user_id: body.user_id,
                user_id2: body.user_id2,
                id1r: body.id1r,
            })
            const data1 = await UserRelation.create({
                user_id: body.user_id2,
                user_id2: body.user_id,
                id1r: body.id1r,
            })
            if (!data) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
            return ReS(res, { data: data, message: "User created successfully." }, 200);
        }


    } catch (error) {
        if (error instanceof ReferenceError) {
            return ReE(res, { message: error.message, err: error.message }, 200);
        }
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};
const updateUserRelation = async function (req, res) {
    try {
        let body = req.body;
        let id1dName = {};
        let id1mName = {};
        let id2mName = {};
        let id2aName = {};
        if (body.id2a != '' && body.id2a != undefined) {
            id2aName = {
                id2a: body.id2a
            };
        }
        if (body.id2m != '' && body.id2m != undefined) {
            id2mName = {
                id2m: body.id2m
            };
        }
        if (body.id1m != '' && body.id1m != undefined) {
            id1mName = {
                id1m: body.id1m
            };
        }
        if (body.id1d != '' && body.id1d != undefined) {
            id1dName = {
                id1d: body.id1d
            };
        }
        const id1data = await UserRelation.findOne({
            where: {
                user_id: body.user_id,
                user_id2: body.user_id2
            }
        })
        if (id1data) {
            if (id1data.user_id == id1data.id1r) {
                const data = await UserRelation.update({
                    ...id1dName,
                    ...id1mName,
                    ...id2mName,
                },
                    {
                        where: {
                            user_id: body.user_id,
                            user_id2: body.user_id2
                        }
                    })
                const data1 = await UserRelation.update({
                    ...id1dName,
                    ...id1mName,
                    ...id2mName,
                },
                    {
                        where: {
                            user_id: body.user_id2,
                            user_id2: body.user_id
                        }
                    })
                if (!data) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
                return ReS(res, { data: data, message: "User updated successfully." }, 200);
            }
            if (id1data.user_id2 == id1data.id1r) {
                const data = await UserRelation.update({
                    ...id1dName,
                    ...id2aName,
                    ...id2mName,
                    ...id1mName
                },
                    {
                        where: {
                            user_id: body.user_id,
                            user_id2: body.user_id2
                        }
                    })
                const data1 = await UserRelation.update({
                    ...id1dName,
                    ...id2aName,
                    ...id2mName,
                    ...id1mName
                },
                    {
                        where: {
                            user_id: body.user_id2,
                            user_id2: body.user_id
                        }
                    })
                if (!data) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
                return ReS(res, { data: data, message: "User updated successfully." }, 200);
            }
        }
        if (!data) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
        return ReS(res, { data: data, message: "User created successfully." }, 200);


    } catch (error) {
        if (error instanceof ReferenceError) {
            return ReE(res, { message: error.message, err: error.message }, 200);
        }
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

module.exports = {
    createUserRelation,
    updateUserRelation,
    getUserRelation,
    getUserLogin
};
