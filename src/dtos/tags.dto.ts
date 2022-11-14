import { IsDefined, IsString } from 'class-validator';

export class CreateTagDto {
  @IsDefined({ message: 'Name is required' })
  @IsString()
  public name: string;
}
