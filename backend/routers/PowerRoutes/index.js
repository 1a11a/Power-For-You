const routes = require("express").Router();
const powerRoutes = require("../../controller/power");

routes.post("/add_power", powerRoutes.addPower);
routes.get("/get_power", powerRoutes.getAllPowers);
routes.get("/get_power/:id", powerRoutes.getPowerById);
routes.put("/updte_power/:id", powerRoutes.updatePowerDetails);
routes.delete("/delete_power/:id", powerRoutes.deletePower);

module.exports = routes;
