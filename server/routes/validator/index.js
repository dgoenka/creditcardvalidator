const express = require("express");

const router = module.exports = express.Router();

router.post("/creditcard",require("./creditcard"));