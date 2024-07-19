var { RoleModule, RolePermission, UserRole } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const { Op } = require('sequelize');


const createRole = async function (req, res) {
    
    try {
    const body = req.body;
    let role_id = req.user.role_id;
    const role = await UserRole.findOne({ where: { role: body.role } })
    if (role) {
        return ReE(res, { message: 'Role has already been taken.' }, 400);
    }
    await UserRole.create({
        role: body.role,
        role_status: body.role_status
    })
    return ReS(res, { message: "Role has been added successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
    
};

const updateRole = async function (req, res) {
    try {
    let body = req.body;
    let role = await UserRole.findOne({
        where: {
            [Op.and]: [
                { role: body.role }
            ],
            [Op.not]: { id: body.role_id }
        }
    });
    if (role) {
        return ReE(res, { message: 'Role has already been taken.' }, 400);
    }
    await UserRole.update(
        { role: body.role,updated_at: new Date()},
        {
            where: { id: body.role_id }
        })

    return ReS(res, { message: "Role has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}

const deleteRole = async function (req, res) {
    try {
        let body = req.body;
        let role_id = req.params.role_id;
        await UserRole.destroy({ where: { id: role_id } })
        return ReS(res, { message: "Role has been deleted successfully." }, 200);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const fetchRole = async function (req, res) {
    try {
        let role_id = req.params.role_id;
        const role = await UserRole.findOne({ where: { id:role_id } })
        if (!role) {
            return ReE(res, { message: "Someting went wrong" }, 400);
        }
        return ReS(res, role);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}


const fetchRolesWithPeginate = async function (req, res) {
    try {
        let body = req.body;
        let roles = await UserRole.findAndCountAll({
            // where: {
            //     [Op.or]: [
            //         { 'role': { [Op.like]: '%' + body.search + '%' } }
            //     ]
            // },
            offset: (( body.activePage - 1) * body.limit),
            limit: body.limit,
            subQuery: false
        });
        return ReS(res, { roles });
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}


module.exports = {
    createRole,
    updateRole,
    deleteRole,
    fetchRole,
    fetchRolesWithPeginate
};
