import express from "express";
import employeesRouter from "#api/employees";

const app = express();
export default app;

// body parsing middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeesRouter);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Sorry! Something went wrong :(");
});
