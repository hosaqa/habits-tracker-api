const express = require("express");
const mainRouter = express.Router();
const habitsRoutes = require("./habits_routes");

mainRouter.use(habitsRoutes);

module.exports = mainRouter;
