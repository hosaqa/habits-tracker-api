const express = require("express");
const cors = require("cors");
const routers = require("./app/routes");
require("./app/db");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use(routers);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
