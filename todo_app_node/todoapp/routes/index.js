const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/", function (req, res, next) {
  const isAuth = req.isAuthenticated();
  knex("tasks")
    .select("*")
    .then(function (results) {
      res.render("index", {
        title: "ToDo App",
        todos: results,
        isAuth: isAuth,
      });
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.post("/", async function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const content = req.body.add;
  const user = await req.user;

  knex("tasks")
    .insert({
      content: content,
      user_id: user.id,
    })
    .then(function () {
      res.redirect("/");
    })
    .catch(function (err) {
      console.error(err);
      res.render("index", {
        title: "ToDo App",
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use("/signup", require("./signup"));
router.use("/signin", require("./signin"));
router.use("/logout", require("./logout"));

module.exports = router;
