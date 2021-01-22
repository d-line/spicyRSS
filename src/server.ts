import * as express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Hello, RSS!');
});

app.listen(5000);