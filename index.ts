import express from 'express';
import pgPromise from 'pg-promise';
const app = express();
const pgp = pgPromise({});
const port = 3001;

//var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");

var db = pgp({
  user:'xjzjvafpqfhesd',
  password: 'b4f830de56079652337172c970846276accad62a05663a6b6647ee54856b4314',
  host: 'ec2-52-214-178-113.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'de1mlrehih6jb5',
  ssl: {
    rejectUnauthorized: false
  }
})

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
  console.log(req.body);
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
