import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  duration: number;
  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
  @IsString()
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null;
}
