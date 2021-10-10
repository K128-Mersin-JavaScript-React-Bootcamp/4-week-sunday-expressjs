import express from "express";
import pgPromise from "pg-promise";
const dotenv = require("dotenv").config();
const homeRouter = require("./routes/home");
const birdsRouter = require("./routes/birds");
const usersRouter = require("./routes/users");
const app = express();
const pgp = pgPromise({});
const port = 3001;

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());
app.use("/", homeRouter);
app.use("/birds", birdsRouter);
app.use("/users", usersRouter);
