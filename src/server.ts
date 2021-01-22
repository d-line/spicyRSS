import * as bodyParser from 'body-parser';
import * as express from "express";

const app = express();

app.use(bodyParser.json());

app.post('/', (request, response) => {
  response.send(request.body);
});

app.listen(5000);