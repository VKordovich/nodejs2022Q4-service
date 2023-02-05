import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbService } from '../db.service';

@Module({
  providers: [AlbumService, DbService],
  controllers: [AlbumController],
})
export class AlbumModule {}
