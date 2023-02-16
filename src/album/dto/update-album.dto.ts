import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  year: number;
  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
