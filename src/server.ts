import * as express from "express";

function loggerMiddleware(request: express.Request, response: express.Response, next) {
  console.log(`${request.method} ${request.path}`);
  next();
}

const app = express();

app.use(loggerMiddleware);

app.get('/', (request, response) => {
  response.send('Hello, RSS!');
});

app.listen(5000);