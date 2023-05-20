const routes = require("express").Router();

const CustomerMainRoute = require("./CustomerRoutes")


routes.use("/customer", CustomerMainRoute);

module.exports = routes;