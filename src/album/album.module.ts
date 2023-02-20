import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  providers: [AlbumService, PrismaService],
  controllers: [AlbumController],
})
export class AlbumModule {}
