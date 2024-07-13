const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const bodyParser = require('body-parser')
const employeeRouter = require("./controllers/employee.controller");
const salaryRouter = require("./controllers/salary.controller");
require('dotenv').config()
const app = express();

connectDB()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/employee", employeeRouter)
app.use("/api/salary", salaryRouter)

app.listen(8000, () => {
  console.log("Server is starting");
});
