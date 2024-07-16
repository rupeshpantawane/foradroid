const express = require("express");
const adminRouter = express.Router();
let errorHandler = require('../middleware/errorHandler');
errorHandler = errorHandler.errorHandler
const passport = require("passport");
require("../middleware/passport")(passport);
const adminMidd = require('../middleware/admin.middleware');
const AuthController = require("../controllers/admin/auth.controller");
const TaskController = require("../controllers/admin/task.controller");
const UserRelationController = require("../controllers/admin/user_relation.controller")


// user authentication AuthController
adminRouter.post("/login", AuthController.login);
adminRouter.post("/register",passport.authenticate("jwt", { session: false }), adminMidd.adminUser, AuthController.Register);
adminRouter.post("/fetch-user", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, AuthController.fetchUser);
adminRouter.post("/update-user", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, AuthController.updateRegister);
adminRouter.post("/delete-user", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, AuthController.deleteUser);
adminRouter.post("/get-users",  TaskController.getUsers);
adminRouter.post("/create-user",  TaskController.createUser);
adminRouter.post("/get-login-user",  UserRelationController.getUserLogin);
adminRouter.post("/create-user-relation",  UserRelationController.createUserRelation);
adminRouter.post("/update-user-relation",  UserRelationController.updateUserRelation);
adminRouter.post("/get-user-relation",  UserRelationController.getUserRelation);





module.exports = adminRouter;
