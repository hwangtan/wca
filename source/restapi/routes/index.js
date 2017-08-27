var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.delete("/users/:id", function(req, res, next) {
  res.sendStatus(200); // ok
  res.sendStatus(201); // created
  res.sendStatus(202); // accepted
  res.sendStatus(204); // No Content
});
router.delete("/users/:id", function(req, res, next) {
  res.sendStatus(301); // equal res.status(301).send('Moved Permanently');
  res.sendStatus(303); // equal res.status(301).send('See other');
  res.sendStatus(304); // equal res.status(301).send('Not Modified');
  res.sendStatus(307); // equal res.status(301).send('Temporary Redirect');
});

router.delete("/users/:id", function(req, res, next) {
  res.status(400).send("Bad Request");
  res.status(401).send("Unauthorized");
  res.status(403).send("Forbidden");
  res.status(404).send("Not Found");
  res.status(405).send("Method Not Allowed");
  res.status(406).send("Not Acceptable");
  res.status(409).send("Conflict");
  res.status(412).send("Precondition Failed");
  res.status(415).send("Unsupported Media Type");
  res.status(500).send("Internal Server Error");
});

router.delete("/users/:id", function(req, res, next) {
  res.sendStatus("2000"); // 2000 if unsupported status code is specified,
});

module.exports = router;
