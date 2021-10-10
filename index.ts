import express from "express";
import pgPromise from "pg-promise";
const dotenv = require("dotenv").config();
const homeRouter = require("./routes/home");
const birdsRouter = require("./routes/birds");
const usersRouter = require("./routes/users");
const app = express();
const pgp = pgPromise({});
const port = 3001;
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());
app.use("/", homeRouter);
//app.use("/", hom);
app.use("/birds", birdsRouter);
app.use("/users", usersRouter);

app.post("/login", (req, res) => {
  console.log(req.url);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.ts"], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
