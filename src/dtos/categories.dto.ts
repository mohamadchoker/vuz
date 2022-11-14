import { IsDefined, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsDefined({ message: 'Name is required' })
  @IsString()
  public name: string;
}
