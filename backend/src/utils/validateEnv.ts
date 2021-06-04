import { cleanEnv, str, port, num } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    MONGO_URI: str(),
    PORT: port(),
    JWT_SECRET: str(),
    AUTH_TOKEN_TTL: num(),
  });
}

export default validateEnv;