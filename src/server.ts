import * as bodyParser from 'body-parser';
import * as express from "express";

const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.get('/', (request, response) => {
  response.send('Spicy RSS');
});

router.post('/', (request, response) => {
  response.send(request.body);
});

app.use('/api', router);
app.listen(5000);