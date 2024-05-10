const getUsers = (req, res) => {};

const getUser = (req, res) => {
  const { user_id } = req.params;
  res.status(200);
  res.send(`User with id: ${user_id}`);
};

const createUser = (req, res) => {
    res.status(201);
    res.send(req.body);
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
