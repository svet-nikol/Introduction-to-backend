const http = require("http");
const { URL } = require("url");
const getUsers = require("./modules/users");
const hello = require("./modules/hello-module");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const requestURL = new URL(request.url, `http://${request.headers.host}`);
  const pathName = requestURL.pathname;
  const searchParams = requestURL.searchParams;

  if (pathName === "/") {
    if (searchParams.has("hello")) {
      const name = searchParams.get("hello"); // тут и будет имя храниться
      if (name) {         //  ответ на запрос: ?hello=Ivan
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end(`Hello, ${name}`);
      } else {             //  ответ на запрос: ?hello
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.end("Enter a name");
      }
    } else if (searchParams.has("users")) {      //  ответ на запрос: ?users
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      response.end();
    } else if (Array.from(searchParams).length === 0) {    //  ответ на запрос: / или если никакие параметры не переданы
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(hello());
      response.end();
    } else {            // если переданы какие-либо другие параметры, например ?Ivan
      response.statusCode = 500;   
      response.end(); 
    }
  } else {
    response.statusCode = 404;  // при попытке открыть страницу типа /Ivan
    response.setHeader("Content-Type", "text/plain");
    response.end("Not Found");
  }
});


server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});

// Написать обработчик запроса:
// - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
// - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
// - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
// - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
// - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500
