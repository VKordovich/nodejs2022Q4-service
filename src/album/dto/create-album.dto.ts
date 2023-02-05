import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsDefined()
  year: number;
  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}
