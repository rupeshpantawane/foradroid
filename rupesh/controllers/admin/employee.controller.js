var {  Emp } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const { Op } = require('sequelize');


const createEmp = async function (req, res) {
    
    try {
    const body = req.body;
    // let role_id = req.user.role_id;
    const role = await Emp.findOne({ where: { first_name: body.first_name, } })
    if (role) {
        return ReE(res, { message: 'Code , Pan Card, Aadhaar Card has already been taken.' }, 400);
    }
    await Emp.create({
        first_name: body.first_name,
        stock: parseInt(body.middle_name),
        sold: parseInt(body.last_name)
    })
    return ReS(res, { message: "Role has been added successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
    
};

const updateEmp = async function (req, res) {
    try {
    let body = req.body;
    await Emp.update(
        {  first_name: body.first_name,
            stock: parseInt(body.middle_name),
            sold: parseInt(body.last_name),
        },
        {
            where: { id: body.emp_id }
        })

    return ReS(res, { message: "Role has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}

const deleteEmp = async function (req, res) {
    try {
        let body = req.body;
        let emp_id = req.params.emp_id;
        await Emp.destroy({ where: { id: emp_id } })
        return ReS(res, { message: "Emp has been deleted successfully." }, 200);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const fetchEmp = async function (req, res) {
    try {
        let emp_id = req.params.emp_id;
        const role = await Emp.findOne({ where: { id:emp_id } })
        if (!role) {
            return ReE(res, { message: "Someting went wrong" }, 400);
        }
        return ReS(res, role);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}


const fetchEmpsWithPeginate = async function (req, res) {
    try {
        let body = req.body;
        let mobileNumber = {};
        if (body.first_name) {
            mobileNumber = {
                first_name: body.first_name
            };
          }
          let getStock =  await Emp.findAll({
            where: {
                ...mobileNumber
              },
          
        });
        if(getStock.length === 0)
        {
            let roles = await Emp.findAndCountAll({
                offset: (( body.activePage - 1) * body.limit),
                limit: body.limit,
                subQuery: false
            });
            return ReS(res, { roles });
        } 
        else
        {
            let roles = await Emp.findAndCountAll({
                where: {
                    ...mobileNumber
                  },
                offset: (( body.activePage - 1) * body.limit),
                limit: body.limit,
                subQuery: false
            });
            return ReS(res, { roles });
        }
        // console.log(getStock,'getStock');
        // let roles = await Emp.findAndCountAll({
        //     where: {
        //         ...mobileNumber
        //       },
        //     offset: (( body.activePage - 1) * body.limit),
        //     limit: body.limit,
        //     subQuery: false
        // });
        // return ReS(res, { roles });
    } catch(error) {
        console.log(error)
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}
const sold = async function (req, res) {
   
    try {
    let body = req.body;
    const role = await Emp.findOne({ where: { id:body.emp_id } })
    const sold = await role.sold  + body.sold;
    const stock = await role.stock  - body.sold;
    await Emp.update(
        {  
            stock: parseInt(stock),
            sold: parseInt(sold),
        },
        {
            where: { id: body.emp_id }
        })

    return ReS(res, { message: "Role has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}


module.exports = {
    createEmp,
    updateEmp,
    deleteEmp,
    fetchEmp,
    fetchEmpsWithPeginate,
    sold
};
