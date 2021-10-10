"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const app = (0, express_1.default)();
const pgp = (0, pg_promise_1.default)({});
const port = 3001;
var db = pgp("postgres://postgres:postgres@localhost:5432/postgres");
app.use(express_1.default.json());
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
    db.one('INSERT INTO "MY_USERS" (name, surname) VALUES($1, $2) RETURNING id', [req.body.name, req.body.surname], (event) => event.id).then((data) => {
        res.send(data);
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
