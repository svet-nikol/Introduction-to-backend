const User = require("../models/user");
const Book = require("../models/book");

const getUsers = (req, res) => {
  User.find({}).populate("booklist")
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const getUser = (req, res) => {
  const { user_id } = req.params;
  User.findById(user_id).populate("booklist")
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const createUser = (req, res) => {
  const data = req.body;
  User.create(data)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const updateUser = (req, res) => {
  const { user_id } = req.params;
  const data = req.body;
  User.findByIdAndUpdate(user_id, data, { new: true, runValidators: true }).populate("booklist")
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const deleteUser = (req, res) => {
  const { user_id } = req.params;
  User.findByIdAndDelete(user_id)
    .then((user) => {
      res.status(200).send("Done");
    })
    .catch((e) => {
      res.status(500).send(e.message);
    });
};

const addBookToUsersList = async (req, res) => {
  const { user_id, book_id } = req.params;

  try {
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).send({ error: "Книга не найдена" });
    }
    const user = await User.findByIdAndUpdate(
      user_id,
      { $addToSet: { booklist: book_id } },
      { new: true, runValidators: true }
    ).populate("booklist");
    return res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const removeBookFromUsersList = async (req, res) => {
  const { user_id, book_id } = req.params;

  try {
    const book = await Book.findById(book_id);
    if (!book) {
      return res.status(404).send({ error: "Книга не найдена" });
    }
    const user = await User.findByIdAndUpdate(
      user_id,
      { $pullAll: { booklist: [{_id: book_id}] } },
      { new: true, runValidators: true }
    ).populate("booklist");
    return res.status(201).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addBookToUsersList,
  removeBookFromUsersList,
};
