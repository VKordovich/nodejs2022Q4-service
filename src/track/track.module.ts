import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { DbService } from '../db.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DbService],
})
export class TrackModule {}
