var { SystemSetting } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const { Op } = require('sequelize');


const updateSystemSetting = async function (req, res) {
    try {
     let body = req.body;
     //console.log(body.data);
     
     for(var attributename in body.data){
        //console.log(attributename+": "+body.data[attributename]);
        await SystemSetting.update(
            { config_value: body.data[attributename],updated_at: new Date()},
            {
                where: { config_key: attributename}
            })
    }
    return ReS(res, { message: "System Settings been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}


const fetchSystemSetting = async function (req, res) {
    //try {
        let settings = await SystemSetting.findAll({
            attributes: ['id','tab'],
            group: [
                ['tab']  
            ],
            include: [ 
                { 
                    model: SystemSetting, as: 'childrens',
                    attributes: {
                        exclude: ['updated_at', 'created_at']
                    } 
                }
            ]
        });





        if (!settings) {
            return ReE(res, { message: "No Data Found" }, 200   );
        }

        return ReS(res, { settings: settings });
    // } catch(error) {
    //     return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    // }
}


module.exports = {
    updateSystemSetting,
    fetchSystemSetting
};
