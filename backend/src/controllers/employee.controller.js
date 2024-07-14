const Employee = require("../schema/employee.schema");
const { Response, PaginateResponse } = require("../utils");
const express = require("express");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getAllEmployees(req, res) {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const offset = limit * (page - 1);
  const sortBy = req.query.sortBy || "id";
  const sortOrder = req.query.sortOrder || "asc";
  const sort = `${sortBy === "asc" ? "" : "-"}${sortOrder}`;
  const employees = await Employee.find()
    .populate("salary")
    .skip(offset)
    .limit(limit)
    .sort(sort);

  res.send(
    new PaginateResponse(
      200,
      employees,
      "Employees fetched",
      employees.length,
      limit,
      offset,
      page,
      Math.ceil(employees.length / limit)
    )
  );
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getEmployee(req, res) {
  const id = req.params["id"];
  if (!id) {
    return res.status(400).json({
      message: "Id not provided",
    });
  }
  const employee = await Employee.findOne({ id: id }).populate("salary");
  res.send(new Response(200, employee, "Employee fetched"));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function addEmployee(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }
  const employee = new Employee(req.body);
  await employee.save();
  res.send(new Response(200, employee, "Employee Added"));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function updateEmployee(req, res) {
  const id = req.params["id"];
  if (!id) {
    return res.status(400).json({
      message: "Id not provided",
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
  const newBody = {
    ...employee._doc,
    ...req.body,
  };

  await Employee.updateOne({ id: id }, newBody);

  res.send(new Response(200, newBody, "Employee Updated"));
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deleteEmployee(req, res) {
  const id = req.params["id"];
  if (!id) {
    return res.status(400).json({
      message: "Id not provided",
    });
  }

  await Employee.deleteOne({ id: id });

  res.send(new Response(204, {}, "Employee Deleted"));
}
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function deleteMultipleEmployees(req, res) {
  if (!req.body) {
    return res.status(400).json({
      message: "Body not provided",
    });
  }

  await Employee.deleteMany({ id: { $in: req.body["ids"] ?? [] }});

  res.send(new Response(204, {}, "Employees Deleted"));
}

const employeeRouter = express.Router();

employeeRouter.route("/").get(getAllEmployees).post(addEmployee);
employeeRouter.route("/delete").post(deleteMultipleEmployees);
employeeRouter
  .route("/:id")
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = employeeRouter;
