import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  duration: number;
  @IsString()
  @IsOptional()
  artistId: string | null;
  @IsString()
  @IsOptional()
  albumId: string | null;
}
