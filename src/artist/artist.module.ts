import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { DbService } from '../db.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, DbService],
})
export class ArtistModule {}
