import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService, PrismaService],
})
export class TrackModule {}
