const express = require("express");
const adminRouter = express.Router();
const validator = require("../common/requests/admin");


let errorHandler = require('../middleware/errorHandler');
errorHandler = errorHandler.errorHandler
const passport = require("passport");
require("../middleware/passport")(passport);
const adminMidd = require('../middleware/admin.middleware');


const AuthController = require("../controllers/admin/auth.controller");

const RoleModuleController = require("../controllers/admin/rolemodule.controller");
const RolePermissionController = require("../controllers/admin/rolepermission.controller");
const RoleController = require("../controllers/admin/role.controller");
const EmployeeController = require("../controllers/admin/employee.controller");
const ProfileController = require("../controllers/admin/profile.controller");
const SimpleCrudController = require("../controllers/admin/simplecrud.controller");

const SystemSetting = require("../controllers/admin/systemsetting.controller");







// Start Auth Controller
adminRouter.post("/login", validator.loginValidation, errorHandler, AuthController.login);
// End Auth Controller


// Start Fetch admin menu
adminRouter.post("/fetch-role-modules", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleModuleController.fetchRoleModule);
adminRouter.post("/fetch-all-modules", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleModuleController.fetchAllModules);
adminRouter.post("/fetchAllModulesByRole", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleModuleController.fetchModulesByRoleID);
adminRouter.post("/addUpdatePermissions", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RolePermissionController.addUpdateRolePermissions);
// End Fetch admin menu

// Start Profile Menu
adminRouter.post("/fetch-roles", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleController.fetchRolesWithPeginate);
adminRouter.post("/create-role", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleController.createRole);
adminRouter.get("/fetch-role/:role_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleController.fetchRole);
adminRouter.post("/update-role", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleController.updateRole);
adminRouter.delete("/delete-role/:role_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleController.deleteRole);

// End Profile Menu

// Start Employee
adminRouter.post("/fetch-emps", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.fetchEmpsWithPeginate);
adminRouter.post("/create-emp", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.createEmp);
adminRouter.get("/fetch-emp/:emp_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.fetchEmp);
adminRouter.post("/update-emp", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.updateEmp);
adminRouter.post("/sold", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.sold);
adminRouter.delete("/delete-emp/:emp_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, EmployeeController.deleteEmp);

// End Employee

///adminRouter.post("/create-role", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, RoleModuleController.fetchRoleModule);

//profile controller
adminRouter.post("/update-profile", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, ProfileController.updateProfile);
adminRouter.post("/change-password", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, ProfileController.changePassword);
adminRouter.post("/update-user-language", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, ProfileController.updateLanguage);


// Start System Setting Controller Start
adminRouter.post("/fetch-system-setting", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SystemSetting.fetchSystemSetting);
adminRouter.post("/update-system-setting", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SystemSetting.updateSystemSetting);
// End System Setting Controller Start

// Start SimpleCrudController
adminRouter.post("/fetch-simple-cruds", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.fetchSimpleCrudsWithPeginate);
adminRouter.post("/create-simple-crud", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.createSimpleCrud);
adminRouter.get("/fetch-simple-crud/:simple_crud_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.fetchSimpleCrud);
adminRouter.post("/update-simple-crud", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.updateSimpleCrud);
adminRouter.delete("/delete-simple-crud/:simple_crud_id", passport.authenticate("jwt", { session: false }), adminMidd.checkUser, SimpleCrudController.deleteSimpleCrud);
adminRouter.post("/register",  SimpleCrudController.register);

// End SimpleCrudController

module.exports = adminRouter;
