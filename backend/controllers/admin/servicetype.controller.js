var { ServiceType, Product } = require('../../models');
const { ReE, ReS } = require('../../services/util.service');
const { Op } = require('sequelize');
const { Parser } = require('json2csv');
const fs = require("fs");
const nodemailer = require('nodemailer');


const fetchProducts = async function (req, res) {
    try {
        let body = req.body;

        const data = await Product.findAndCountAll({
            attributes: {
                include: ["id", "title", "description", "price",
                    "discount_percentage", "rating", "stock", "brand",
                    "category"],
                exclude: ["deleted_at", "created_at", "updated_at", "deletedAt"],
            }
        });
        if (!data) {
            return ReE(res, { message: "No Data Found" }, 200);
        }
        return ReS(res, { data: data, message: "success" });
    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

const searchProduct = async function (req, res) {
    try {
        let body = req.body;
        const data = await Product.findAndCountAll({
            where: { title: body.title }
        });
        if (!data) {
            return ReE(res, { message: "No Data Found" }, 200);
        }
        return ReS(res, { data: data, message: "success" });
    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};
const fetchServiceTypes = async function (req, res) {
    try {
        let body = req.body;
        const jsonToCsvParser = new Parser()
        jsonToCsvParser
        const data = await Product.findAndCountAll({
            offset: (body.page - 1) * body.limit,
            limit: body.limit,
            subQuery: false,
            order: [
                ['id', 'DESC'],
            ],
            attributes: {
                include: ["id", "title", "description", "price",
                    "discount_percentage", "rating", "stock", "brand",
                    "category"],
                exclude: ["deleted_at", "created_at", "updated_at", "deletedAt"],
            },
        });
        const nodedata = await JSON.parse(JSON.stringify(data.rows))

        const csv = await jsonToCsvParser.parse(nodedata)

        fs.writeFile("Product.csv", csv, function (err) {
            if (err) {
                throw err;
            }
        })
        // res.attachment("Product.csv")
        // res.status(200).send(csv)
        if (!data) {
            return ReE(res, { message: "No Data Found" }, 200);
        }
        return ReS(res, { data: data, sr_no_start: (body.page - 1) * body.limit, message: "success" });
    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

const createServiceType = async function (req, res) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'rj.surya1999@gmail.com', // Your Gmail email address rj.surya1999@gmail.com
                pass: 'hweh shrr wjyq wizo' // Your Gmail password
            }
        });
        let mailOptions = {
            from: 'rj.surya1999@gmail.com', // Sender address
            to: 'rupeshpantawane62@gmail.com,rjrock724@gmail.com', // List of recipients
            subject: 'Test Email', // Subject line
            text: 'Hello, this is a test email from Node.js' // Plain text body
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.stack);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

};


// const createServiceType = async function (req, res) {

//     try {
//         let body = req.body;
//         await Product.create({
//             title: body.title,
//             description: body.description ? body.description : "th",
//             price: body.price ? body.price : 1,
//             discount_percentage: body.discount_percentage,
//             rating: body.rating,
//             stock: body.stock,
//             brand: body.brand,
//             category: body.category,

//             created_at: new Date()



//         }).then(function (result) {
//             if (!result.id) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
//             return ReS(res, { message: "ServiceType has been added successfully." }, 200);
//         }).catch(function (err) {
//             return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
//         });

//     } catch (error) {
//         return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
//     }

// };

const fetchServiceType = async function (req, res) {
    try {
        let body = req.body;
        const data = await ServiceType.findOne({
            where: { id: body.service_type_id }
        });
        if (!data) {
            return ReE(res, { message: "No Data Found" }, 200);
        }
        return ReS(res, { data: data, message: "success" });

    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

};


const updateServiceType = async function (req, res) {

    try {
        let body = req.body;
        await Product.update({
            title: body.title,
            description: body.description ? body.description : "th",
            price: body.price ? body.price : 1,
            discount_percentage: body.discount_percentage,
            rating: body.rating,
            stock: body.stock,
            brand: body.brand,
            category: body.category,


        },
            {
                where: { id: body.service_type_id }
            }).then(function (result) {
                if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
                return ReS(res, { message: "Product has been updated successfully." }, 200);
            }).catch(function (err) {
                return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
            });

    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

};
const deleteServiceType = async function (req, res) {
    try {
        let body = req.body;
        const serviceType = await Product.destroy({
            where: { id: body.service_type_id }
        }).then(function (result) {
            if (!result) return ReE(res, { message: "Somthing Went Wrong Please try after sometime." }, 400);
            return ReS(res, { message: "ServiceType has been deleted successfully." }, 200);
        }).catch(function (err) {
            return ReE(res, { message: "Somthing Went Wrong", err: err.errors }, 200);
        });

    } catch (error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

module.exports = {
    fetchServiceTypes,
    createServiceType,
    fetchServiceType,
    updateServiceType,
    deleteServiceType,
    fetchProducts,
    searchProduct
};
