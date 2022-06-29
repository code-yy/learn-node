const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$Yuto1124",
  database: "todo_app",
});

let todos = [];

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "ToDo App",
    todos: todos,
  });
});

router.post("/", function (req, res, next) {
  connection.connect((err) => {
    if (err) {
      console.log("error connecting: " + err.stack);
      return;
    }
    console.log("success");
  });
  const todo = req.body.add;
  connection.query(
    `insert into tasks (user_id, content) values (1, '${todo}');`,
    (error, results) => {
      console.log(error);
      console.log(todo);
      res.redirect("/");
    }
  );
});

module.exports = router;
