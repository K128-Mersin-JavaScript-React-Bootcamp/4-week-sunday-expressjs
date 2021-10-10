import express from 'express';
import pgPromise from 'pg-promise';
const app = express();
const pgp = pgPromise({});
const port = 3001;
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

app.use(express.json());

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
