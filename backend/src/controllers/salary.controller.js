const  Employee  = require("../schema/employee.schema");
const Salary = require("../schema/salary.schema");
const { Response } = require("../utils");
const express = require("express");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addSalary(req, res) {
    const id = req.params["eId"];
    if (!id) {
      return res.status(400).json({
        message: "Employee Id not provided",
      });
    }
  const employee = await Employee.findOne({ id: id });
  if (!employee) {
    return res.status(400).json({
      message: "Employee not found",
    });
  }

  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }

  const salary = new Salary(req.body);
  await salary.save();

  await Employee.updateOne({ id: id }, { salary: salary._id });
  res.send(new Response(200, salary, "Salary Added"))
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateSalary(req, res) {
    const id = req.params["id"];
    if (!id) {
      return res.status(400).json({
        message: "Id not provided",
      });
    }
  const salary = await Salary.findOne({ _id: id });
  if (!salary) {
    return res.status(400).json({
      message: "Salary not found",
    });
  }
  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }

  const newBody = {
    ...salary._doc,
    ...req.body
  }

  await Salary.updateOne({ _id: id }, newBody);

  res.send(new Response(200, salary, "Salary Updated"))
}

const salaryRouter = express.Router();

salaryRouter.route("/:eId/add").post(addSalary);
salaryRouter.route("/:id").put(updateSalary);

module.exports = salaryRouter
