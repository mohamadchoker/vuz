import { IsDefined, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { IsTagAlreadyExist } from '@/rules/TagExist.rule';
import { IsCategoryAlreadyExist } from '@/rules/CategoryExist.rule';

export class CreateCarDto {
  @IsDefined({ message: 'Category is required' })
  @IsNumber()
  @IsCategoryAlreadyExist({ message: 'Category is not exist.' })
  public category_id: number;

  @IsDefined({ message: 'Image is required' })
  @IsUrl()
  public image: string;

  @IsOptional()
  @IsTagAlreadyExist({ message: 'One or more than tag does not exists.' })
  public tags: number[];

  @IsDefined({ message: 'Latitude is required' })
  @IsNumber()
  public latitude: number;

  @IsDefined({ message: 'Longitude is required' })
  @IsNumber()
  public longitude: number;
}
