const express = require("express");
const adminRouter = express.Router();


const ServiceTypeController = require("../controllers/admin/servicetype.controller");

//  ServiceTypeController Start
adminRouter.post("/fetch-service-types",  ServiceTypeController.fetchServiceTypes);
adminRouter.get("/fetch-service-types",  ServiceTypeController.fetchServiceTypes);
adminRouter.post("/create-service-type",  ServiceTypeController.createServiceType);
adminRouter.post("/fetch-service-type",  ServiceTypeController.fetchServiceType);
adminRouter.post("/update-service-type",  ServiceTypeController.updateServiceType);
adminRouter.post("/delete-service-type",  ServiceTypeController.deleteServiceType);
adminRouter.get("/fetch-products",  ServiceTypeController.fetchProducts);
adminRouter.post("/search-product",  ServiceTypeController.searchProduct);

module.exports = adminRouter;
