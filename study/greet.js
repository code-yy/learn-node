"use strict";

function greet(name) {
  console.log(`hello ${name}`);
}

module.exports = greet;

("use strict");

const greet = require("./greet");
greet("Yamada");
