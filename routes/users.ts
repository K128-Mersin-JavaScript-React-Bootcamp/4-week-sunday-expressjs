import express from "express";
import pgPromise from "pg-promise";
const dotenv = require("dotenv").config();
const router = express.Router();
const app = express();
const pgp = pgPromise({});
const port = 3001;
var db = pgp({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
router
  .route("/")
  .all((req, res, next) => {
    console.log("Request detected");
    next();
  })
  .get((req, res) => {
    db.query('SELECT id, name, surname FROM "MY_USERS"')
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        res.send(error);
      });
  })
  .post((req, res) => {
    console.log(req.body);
    db.one(
      'INSERT INTO "MY_USERS" (name, surname) VALUES($1, $2) RETURNING id',
      [req.body.name, req.body.surname],
      (event) => event.id
    ).then((data) => {
      res.send(data);
    });
  });
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The user's name.
 *                       example: Leanne Graham
 */
router
  .route("/:id")
  .get((req, res) => {
    db.one('SELECT id, name, surname FROM "MY_USERS" WHERE id=$1', [
      req.params.id,
    ])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        res.sendStatus(404);
      });
  })
  .delete((req, res) => {
    db.query('DELETE FROM "MY_USERS" WHERE id=$1', [req.params.id])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        res.sendStatus(404);
      });
  })
  .put((req, res) => {
    console.log(req.body);
    db.query('UPDATE "MY_USERS" SET name=$1, surname=$2 WHERE id=$3', [
      req.body.name,
      req.body.surname,
      req.params.id,
    ])
      .then(function (data) {
        res.send(data);
      })
      .catch(function (error) {
        res.sendStatus(404);
      });
  });

module.exports = router;
