const express = require("express");
const baseRouter = express.Router();
const validator = require("../common/requests/admin");


let errorHandler = require('../middleware/errorHandler');
errorHandler = errorHandler.errorHandler
const passport = require("passport");
require("../middleware/passport")(passport);
const adminMidd = require('../middleware/admin.middleware');



const SimpleCrudController = require("../controllers/admin/simplecrud.controller");








// Start SimpleCrudController
baseRouter.post("/fetch-simple-cruds", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.fetchSimpleCrudsWithPeginate);
baseRouter.post("/create-simple-crud", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.createSimpleCrud);
baseRouter.get("/fetch-simple-crud/:simple_crud_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.fetchSimpleCrud);
baseRouter.post("/update-simple-crud", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.updateSimpleCrud);
baseRouter.delete("/delete-simple-crud/:simple_crud_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.deleteSimpleCrud);
baseRouter.post("/user/register",  SimpleCrudController.register);
baseRouter.post("/payment/method/attach",  SimpleCrudController.attach);
baseRouter.get("/payment/methods",  SimpleCrudController.methods);
baseRouter.post("/payment/create",  SimpleCrudController.create);
baseRouter.post("/payment/confirm",  SimpleCrudController.confirm);
baseRouter.post("/payment/confirm",  SimpleCrudController.confirm);

// End SimpleCrudController


module.exports = baseRouter;
