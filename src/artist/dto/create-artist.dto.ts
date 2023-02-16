import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsDefined()
  grammy: boolean;
}
