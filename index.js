const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

var pgp = require("pg-promise")(/* options */);
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

app.get("/", (req, res) => {
  db.query('SELECT id, name, surname FROM "MY_USERS"')
    .then(function (data) {
      res.send(data);
    })
    .catch(function (error) {
      res.send(error);
    });
});

app.post("/", (req, res) => {
  console.log(req.body.name);
  db.one(
    'INSERT INTO "MY_USERS" (name, surname) VALUES($1, $2) RETURNING id',
    [req.body.name, req.body.surname],
    (event) => event.id
  ).then((data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
