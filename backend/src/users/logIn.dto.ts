import { IsString } from "class-validator";

class LogInDto {
  @IsString()
  public password: string;
}

export default LogInDto;
