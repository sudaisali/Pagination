const express = require('express')
const router = express.Router();
const getcars = require('../middleware.js/cars')


router.get("/getcars",  getcars)

module.exports = router