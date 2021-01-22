// @ts-ignore
import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_URL: str(),
    PORT: port(),
  });
}

export default validateEnv;