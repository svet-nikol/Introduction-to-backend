const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addBookToUsersList,
  removeBookFromUsersList,
} = require("../controllers/users");

router.get("/users", getUsers);
router.get("/users/:user_id", getUser);
router.post("/users", createUser);
router.patch("/users/:user_id", updateUser);
router.delete("/users/:user_id", deleteUser);
router.patch("/users/:user_id/booklist/:book_id", addBookToUsersList);
router.delete("/users/:user_id/booklist/:book_id", removeBookFromUsersList);

module.exports = router;