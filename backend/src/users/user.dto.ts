import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public password: string;
}

export default CreateUserDto;