import { cleanEnv, str, port } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port(),
    JWT_SECRET: str()
  });
}

export default validateEnv;