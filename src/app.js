const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/users');
const bookRouter = require('./routers/books');
const loggerOne = require('./middleware/loggerOne');
const logMethodMiddleware = require('./middleware/logMethodMiddleware')

dotenv.config();

const { PORT, API_URL, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL).catch(error => handleError(error));

const app = express();

const helloWorld = (req, res) => {
    res.status(200);
    res.send("Hello World!");
};

app.use(cors());
app.use(loggerOne);
app.use('/', logMethodMiddleware);
app.get('/', (req, res) => {
    res.status(200);
    res.send(`Hello, ${req.query.helloWorld}!`);
});
app.use(bodyParser.json());

app.get("/", helloWorld);

app.post("/", (req, res) => {
    res.status(200);
    res.send("Hello from POST!");
});

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
