const express = require("express");
const router = express.Router();

const {
  createPost,
  fetchPosts,
  fetchPost,
  updatePost,
  deletePost,
  searchPost,
} = require("../controllers/postControllers");

router.post("/", createPost);
router.get("/", fetchPosts);
router.get("/search", searchPost);
router.get("/:id", fetchPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
