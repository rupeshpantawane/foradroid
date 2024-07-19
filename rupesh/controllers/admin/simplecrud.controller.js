var { SimpleCrud } = require('../../models');
const { ReE, ReS, to } = require('../../services/util.service');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const stripe = require("stripe")(require("../../config/config.json").stripeSecretKey);





const fetchSimpleCrudsWithPeginate = async function (req, res) {
    try {
        let body = req.body;
        let data = await SimpleCrud.findAndCountAll({
            offset: (( body.activePage - 1) * body.limit),
            limit: body.limit,
            subQuery: false
        });
        return ReS(res, { data });
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
};

const createSimpleCrud = async function (req, res) {
    
    try {
    const body = req.body;
    const simpleCrud = await SimpleCrud.findOne({ where: { first_name: body.first_name } })
    if (simpleCrud) {
        return ReE(res, { message: 'SimpleCrud has already been taken.' }, 400);
    }
    await SimpleCrud.create({
        first_name: body.first_name,
        last_name: body.last_name,
        created_at: new Date()
    })
    return ReS(res, { message: "SimpleCrud has been added successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
    
};
const fetchSimpleCrud = async function (req, res) {
    try {
        let simple_crud_id = req.params.simple_crud_id;
        const data = await SimpleCrud.findOne({ where: { id:simple_crud_id } })
        if (!data) {
            return ReE(res, { message: "Someting went wrong" }, 400);
        }
        return ReS(res, data);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const updateSimpleCrud = async function (req, res) {
    try {
    let body = req.body;
    let getData = await SimpleCrud.findOne({
        where: {
            [Op.and]: [
                { first_name: body.first_name }
            ],
            [Op.not]: { id: body.simple_crud_id }
        }
    });
    if (getData) {
        return ReE(res, { message: 'SimpleCrud has already been taken.' }, 400);
    }
    await SimpleCrud.update(
        { 
            first_name: body.first_name,
            last_name: body.last_name,
            updated_at: new Date()
        },
        {
            where: { id: body.simple_crud_id }
        })

    return ReS(res, { message: "SimpleCrud has been updated successfully." }, 200);

    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }

}

const deleteSimpleCrud = async function (req, res) {
    try {
        let body = req.body;
        let simple_crud_id = req.params.simple_crud_id;
        await SimpleCrud.destroy({ where: { id: simple_crud_id } })
        return ReS(res, { message: "SimpleCrud has been deleted successfully." }, 200);
    } catch(error) {
        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
    }
}

const register = async function (req, res) {
    const { email, name, password, phone } = req.body;

  /*  Add this user in your database and store stripe's customer id against the user   */
  try {
    const customer = await createStripeCustomer({ email, name, password, phone });
    console.log(customer);
    res.status(200).json({ message: "Customer created" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "An error occured" });
  }
}

const attach = async function (req, res) {
    const { paymentMethod } = req.body;

    /* Fetch the Customer Id of current logged in user from the database */
    const customerId = "cus_NS0L43iEzeLzmf";
  
    try {
      const method = await attachMethod({ paymentMethod, customerId });
      console.log(method);
      res.status(200).json({ message: "Payment method attached succesully" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Could not attach method" });
    }
}

const methods = async function (req, res) {
    /* Query database to fetch Stripe Customer Id of current logged in user */
  const customerId = "cus_NS0L43iEzeLzmf";

  try {
    const paymentMethods = await listCustomerPayMethods(customerId);
    res.status(200).json(paymentMethods);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not get payment methods");
  }
}

const create = async function (req, res) {
    const { paymentMethod } = req.body;

  /* Query database for getting the payment amount and customer id of the current logged in user */

  const amount = 1000;
  const currency = "INR";
  const userCustomerId = "cus_NS0L43iEzeLzmf";

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      customer: userCustomerId,
      payment_method: paymentMethod,
      confirmation_method: "manual", // For 3D Security
      description: "Buy Product",
    });

    /* Add the payment intent record to your datbase if required */
    res.status(200).json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not create payment");
  }
}

const confirm = async function (req, res) {
    const { paymentMethod } = req.body;

  /* Query database for getting the payment amount and customer id of the current logged in user */

  const amount = 1000;
  const currency = "INR";
  const userCustomerId = "cus_NS0L43iEzeLzmf";

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
      customer: userCustomerId,
      payment_method: paymentMethod,
      confirmation_method: "manual", // For 3D Security
      description: "Buy Product",
    });

    /* Add the payment intent record to your datbase if required */
    res.status(200).json(paymentIntent);
  } catch (err) {
    console.log(err);
    res.status(500).json("Could not create payment");
  }
}

async function createStripeCustomer({ name, email, phone }) {
    return new Promise(async (resolve, reject) => {
      try {
        const Customer = await stripe.customers.create({
          name: name,
          email: email,
          phone: phone,
        });
  
        resolve(Customer);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
  
  async function listCustomerPayMethods(customerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const paymentMethods = await stripe.customers.listPaymentMethods(customerId, {
          type: "card",
        });
        resolve(paymentMethods);
      } catch (err) {
        reject(err);
      }
    });
  }
  
  function attachMethod({ paymentMethod, customerId }) {
    return new Promise(async (resolve, reject) => {
      try {
        const paymentMethodAttach = await stripe.paymentMethods.attach(paymentMethod.id, {
          customer: customerId,
        });
        resolve(paymentMethodAttach);
      } catch (err) {
        reject(err);
      }
    });
  }





module.exports = {
    fetchSimpleCrudsWithPeginate,
    createSimpleCrud,
    fetchSimpleCrud,
    updateSimpleCrud,
    deleteSimpleCrud,
    register,
    attach,
    methods,
    create,
    confirm
};
