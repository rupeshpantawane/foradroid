var { RoleModule, RolePermission } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


const fetchRoleModule = async function (req, res) {
    const body = req.body;
    // let role_id = req.user.role_id;
    let role_id = 1;
    try {
        let getmodule = await RoleModule.findAll({
            where: {
                parent_id: {
                    [Op.eq]: 0
                },
                //'$RolePermission.role_id$': role_id,
                [Op.and]: [Sequelize.literal('exists (select 1 from role_permissions where (module_id = childrens.id || module_id = RoleModule.id ) and role_id =' + role_id + ')')]
            },
            attributes: [
                'id', 'parent_id', 'name', 'icon', 'route', 'action', 'is_dropdown', 'is_readonly'
            ],
            order: [
                ['id', 'ASC']
            ],
            include: [
                {
                    model: RoleModule, as: 'childrens',
                    attributes: {
                        exclude: ['updated_at', 'created_at']
                    },
                    include: [
                        {
                            as: "RolePermission",
                            model: RolePermission,
                            attributes: {
                                include: [],
                                exclude: ['created_at', 'updated_at']
                            },
                            where: {
                                role_id: role_id,
                            },
                            required: true
                        }
                    ]
                },
                {
                    as: "RolePermission",
                    model: RolePermission,
                    attributes: {
                        include: [],
                        exclude: ['created_at', 'updated_at']
                    },
                    required: true
                }
            ]
        });
        let totalCounts = await RoleModule.count();
        return ReS(res, { modules: getmodule, totalCounts });
    } catch (error) {
        throw error;
    }

};

const fetchAllModules = async function (req, res) {
    let body = req.body;
    let getmodule = await RoleModule.findAll({
        include: [
            {
                model: RoleModule, as: 'childrens',
                attributes:[
                    'id', 'parent_id', 'name', 'icon', 'route', 'action', 'is_dropdown', 'is_readonly'
                ]
            }
        ],
        attributes:[
            'id', 'parent_id', 'name', 'icon', 'route', 'action', 'is_dropdown', 'is_readonly'
        ],
        where: {
            parent_id: {
                [Op.eq]: 0
            }
        },
        order: [
            ['id', 'ASC']
        ],
    });
    return ReS(res, { modules: getmodule });
}


const fetchModulesByRoleID = async function (req, res) {
    try {
        const body = req.body;
        const getmodule = await RoleModule.findAll({
            include: [
                {
                    model: RoleModule, as: 'childrens',
                    attributes:[
                        'id', 'parent_id', 'name', 'icon', 'route', 'action', 'is_dropdown', 'is_readonly',
                        [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = childrens.id and rp.role_id = '+body.role_id+')'), "isChecked"],
                        [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = childrens.id and is_read=1 and rp.role_id = '+body.role_id+')'), "isRead"],
                        [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = childrens.id and is_create=1 and rp.role_id = '+body.role_id+')'), "isCreate"],
                        [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = childrens.id and is_edit=1 and rp.role_id = '+body.role_id+')'), "isEdit"],
                        [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = childrens.id and is_delete=1 and rp.role_id = '+body.role_id+')'), "isDelete"]
                    ]
                }
            ],
            attributes:[
                'id', 'parent_id', 'name', 'icon', 'route', 'action', 'is_dropdown', 'is_readonly',
                [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = RoleModule.id and rp.role_id = '+body.role_id+')'), "isChecked"],
                [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = RoleModule.id and is_read=1 and rp.role_id = '+body.role_id+')'), "isRead"],
                [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = RoleModule.id and is_create=1 and rp.role_id = '+body.role_id+')'), "isCreate"],
                [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = RoleModule.id and is_edit=1 and rp.role_id = '+body.role_id+')'), "isEdit"],
                [Sequelize.literal('(Select count(*) from role_permissions as rp where rp.module_id = RoleModule.id and is_delete=1 and rp.role_id = '+body.role_id+')'), "isDelete"]
            ],
            where: {
                parent_id: {
                    [Op.eq]: 0
                }
            },
            order: [
                ['id', 'ASC']
            ],
        });

        return ReS(res, { modules: getmodule }); 
    } catch (error) {
        console.log(error);
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

module.exports = {
    fetchRoleModule,
    fetchAllModules,
    fetchModulesByRoleID
};
