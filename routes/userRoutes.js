const express = require("express");
const router = express.Router();

const {
  createUser,
  fetchUsers,
  fetchUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.post("/", createUser);
router.get("/", fetchUsers);
router.get("/:id", fetchUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
