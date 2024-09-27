const express = require("express");
const router = express.Router();

router.use("/api/users", require("./userRoutes"));

module.exports = router;