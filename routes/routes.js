const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const router = express.Router();
const controllers = require("./../controllers/controllers");

router.get("/say-something", (req, res) => {
  res.status(200).send("Hello from the server!");
});

module.exports = router;
