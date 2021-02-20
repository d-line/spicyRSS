import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port(),
    JWT_SECRET: str()
  });
}

export default validateEnv;