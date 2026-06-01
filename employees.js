import express from "express";
const router = express.Router();
export default router;

import {
  getEmployee,
  getEmployees,
  getRandomEmployee,
  addEmployee,
} from "#db/employees";

router.get("/", (req, res) => {
  const employees = getEmployees();
  res.send(employees);
});

router.post("/", (req, res) => {
  if (!req.body) return res.status(400).send("Request needs body with 'name'");
  const { name } = req.body;
  if (!name) return res.status(400).send("Request needs body with 'name'");

  const employee = addEmployee(name);
  res.status(201).send(employee);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
router.get("/random", (req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(+id);

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});
