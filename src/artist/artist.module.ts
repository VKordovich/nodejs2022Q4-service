import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
