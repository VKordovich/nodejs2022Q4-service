import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
