const express = require("express");
const router = express.Router();

router.use("/api/users", require("./userRoutes"));
router.use("/api/posts", require("./postRoutes"));
router.use("/api/comments", require("./commentRoutes"));

module.exports = router;
