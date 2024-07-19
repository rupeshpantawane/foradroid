var { RolePermission } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const addUpdateRolePermissions = async function (req, res) {
    try {
        const permissionArr = req.body.permmssionArr;
        if(permissionArr.length > 0){
            permissionArr.forEach(async (permission, i) => {
                const isExist = await RolePermission.findOne({
                    where: {
                        role_id: req.body.role_id,
                        module_id: permission.id
                    }
                });

                if(!isExist){
                    if(permission.isChecked){
                        await RolePermission.create({
                            role_id: req.body.role_id,
                            module_id: permission.id,
                            is_read: true,
                            is_create: false,
                            is_edit: false,
                            is_delete: false
                        });
                    }
                }

                if(permission.childrens.length > 0){
                    permission.childrens.forEach(async (child, j) => {
                        const isChildExist = await RolePermission.findOne({
                            where: {
                                role_id: req.body.role_id,
                                module_id: child.id
                            }
                        });

                        if(isChildExist){
                            //update
                            if(child.isChecked){
                                await RolePermission.update({
                                    is_read: child.view,
                                    is_create: child.add,
                                    is_edit: child.edit,
                                    is_delete: child.delete
                                },
                                {
                                    where: { 
                                        role_id: req.body.role_id,
                                        module_id: child.id 
                                    }
                                });
                            }
                        }else{
                            //create
                            if(child.isChecked){
                                await RolePermission.create({
                                    role_id: req.body.role_id,
                                    module_id: child.id,
                                    is_read: child.view,
                                    is_create: child.add,
                                    is_edit: child.edit,
                                    is_delete: child.delete
                                });
                            }
                        }
                    });
                }

            });
        }
        return ReS(res, { message: "success" }); 
    } catch (error) {
        console.log(error);
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

module.exports = {
    addUpdateRolePermissions
};
