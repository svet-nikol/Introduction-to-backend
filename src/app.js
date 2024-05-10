const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routers/users');
const loggerOne = require('./middleware/loggerOne');
const logMethodMiddleware = require('./middleware/logMethodMiddleware')

dotenv.config();

const app = express();

const { PORT, API_URL } = process.env;

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

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
