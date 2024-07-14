const express = require("express");
const cors = require("cors");
const connectDB = require("./config");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const employeeRouter = require("./controllers/employee.controller");
const salaryRouter = require("./controllers/salary.controller");
const { verifyJWT } = require("./utils");
const userRouter = require("./controllers/user.controller");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/employee", verifyJWT, employeeRouter);
app.use("/api/salary", verifyJWT, salaryRouter);

app.listen(8000, () => {
  console.log("Server is starting");
});
