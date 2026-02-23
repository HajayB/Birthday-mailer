const {runBirthdayEmails} = require("../controller/workerController");


const express = require("express");
const router = express.Router();


router.post("/run-worker", runBirthdayEmails);


module.exports = router;