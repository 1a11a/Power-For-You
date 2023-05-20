const routes = require("express").Router();
const customerRoutes = require("../../controller/customer");

routes.post("/add_customer", customerRoutes.addCustomer);
routes.get("/get_customer", customerRoutes.getAllCustomers);
routes.get("/get_customer/:id", customerRoutes.getCustomerById);
routes.put("/updte_customer/:id", customerRoutes.updateCustomerDetails);
routes.delete("/delete_customer/:id", customerRoutes.deleteCustomer);


module.exports = routes;