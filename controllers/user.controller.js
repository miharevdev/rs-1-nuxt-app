const db = require("../database/db.js");

class UserController {
    async createUser(req, res) {
        const {name, surname} = req.body;
        const newPerson = await db.query("INSERT INTO person (name, surname) values ($1, $2) RETURNING *", [name, surname]);
        res.json(newPerson.rows[0]);
    }

    async getUsers(req, res) {
        const allUsers = await db.query("SELECT * FROM person");
        res.json(allUsers.rows);
    }

    async getOneUser(req, res) {
        const id = req.params.id;
        console.log(req.params);
        const user = await db.query("SELECT * FROM person where id = $1", [id]);
        res.json(user.rows[0]);
    }

    async updateUser(req, res) {
        const {id, name, surname} = req.body;
        const user = await db.query("UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *",
        [name, surname, id]);
        res.json(user.rows[0]);
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        const user = await db.query("DELETE FROM person where id = $1", [id]);
        res.json(user.rows[id]);
    }
}

module.exports = new UserController();