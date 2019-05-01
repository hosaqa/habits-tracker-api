// routes/index.js
const habitsRoutes = require('./habits_routes');
module.exports = function (app, db) {
  habitsRoutes(app, db);
};