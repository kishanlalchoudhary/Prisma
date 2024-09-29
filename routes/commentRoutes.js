const express = require("express");
const router = express.Router();

const {
  createComment,
  fetchComments,
  fetchComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentControllers");

router.post("/", createComment);
router.get("/", fetchComments);
router.get("/:id", fetchComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
