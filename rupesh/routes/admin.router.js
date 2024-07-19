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
// const SimpleCrudController = require("../controllers/admin/simplecrud.controller");

const SystemSetting = require("../controllers/admin/systemsetting.controller");







// Start Auth Controller
adminRouter.post("/login", validator.loginValidation, errorHandler, AuthController.login);
// End Auth Controller


// Start Fetch admin menu
adminRouter.post("/fetch-role-modules", RoleModuleController.fetchRoleModule);
adminRouter.post("/fetch-all-modules", RoleModuleController.fetchAllModules);
adminRouter.post("/fetchAllModulesByRole", RoleModuleController.fetchModulesByRoleID);
adminRouter.post("/addUpdatePermissions", RolePermissionController.addUpdateRolePermissions);
// End Fetch admin menu

// Start Profile Menu
adminRouter.post("/fetch-roles", RoleController.fetchRolesWithPeginate);
adminRouter.post("/create-role", RoleController.createRole);
adminRouter.get("/fetch-role/:role_id", RoleController.fetchRole);
adminRouter.post("/update-role", RoleController.updateRole);
adminRouter.delete("/delete-role/:role_id", RoleController.deleteRole);

// End Profile Menu

// Start Employee
adminRouter.post("/fetch-emps", EmployeeController.fetchEmpsWithPeginate);
adminRouter.post("/create-emp", EmployeeController.createEmp);
adminRouter.get("/fetch-emp/:emp_id", EmployeeController.fetchEmp);
adminRouter.post("/update-emp", EmployeeController.updateEmp);
adminRouter.post("/sold", EmployeeController.sold);
adminRouter.delete("/delete-emp/:emp_id", EmployeeController.deleteEmp);

// End Employee

///adminRouter.post("/create-role", RoleModuleController.fetchRoleModule);

//profile controller
adminRouter.post("/update-profile", ProfileController.updateProfile);
adminRouter.post("/change-password", ProfileController.changePassword);
adminRouter.post("/update-user-language", ProfileController.updateLanguage);


// Start System Setting Controller Start
adminRouter.post("/fetch-system-setting", SystemSetting.fetchSystemSetting);
adminRouter.post("/update-system-setting", SystemSetting.updateSystemSetting);
// End System Setting Controller Start

// Start SimpleCrudController
adminRouter.post("/fetch-simple-cruds", SimpleCrudController.fetchSimpleCrudsWithPeginate);
adminRouter.post("/create-simple-crud", SimpleCrudController.createSimpleCrud);
adminRouter.get("/fetch-simple-crud/:simple_crud_id", SimpleCrudController.fetchSimpleCrud);
adminRouter.post("/update-simple-crud", SimpleCrudController.updateSimpleCrud);
adminRouter.delete("/delete-simple-crud/:simple_crud_id", SimpleCrudController.deleteSimpleCrud);
adminRouter.post("/register",  SimpleCrudController.register);

// End SimpleCrudController

module.exports = adminRouter;
