const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const mongoose = require('mongoose');
const userRouter = require('./routers/users');
const bookRouter = require('./routers/books');
const logOriginalUrlMiddleware = require('./middleware/logOriginalUrlMiddleware')

dotenv.config();

const { PORT, API_URL, MONGO_URL } = process.env;

mongoose.connect(MONGO_URL).catch(error => handleError(error));

const app = express();

app.use(cors);
app.use('/', logOriginalUrlMiddleware);

app.use(bodyParser.json());

app.use(userRouter);
app.use(bookRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
});
