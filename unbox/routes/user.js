// Importing packages
const express = require('express');
const router = express.Router()


const {test} = require("../controllers/user");

router.get("/", test);

module.exports = router;