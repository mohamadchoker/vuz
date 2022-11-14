import { IsOptional, Min } from 'class-validator';

export class SearchCarsDto {
  @IsOptional()
  public query: string;

  @IsOptional()
  public tags: string;

  @IsOptional()
  public category: string;

  @IsOptional()
  public iterator: string;

  @IsOptional()
  public lat: number;

  @IsOptional()
  public lng: number;

  @IsOptional()
  @Min(1)
  public page: number;

  @IsOptional()
  @Min(1)
  public size: number;
}
