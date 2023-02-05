import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { Observable } from 'rxjs';
import { TrackModel } from './track.model';
import { IdPipe } from '../pipes/id.pipe';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAllTracks(): Observable<TrackModel[]> {
    return this.trackService.getAllTracks();
  }

  @UsePipes(new IdPipe())
  @Get(':id')
  getTrack(@Param() { id }: { id: string }): Observable<TrackModel> {
    return this.trackService.getTrack(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  createTrack(
    @Body() { name, duration, artistId, albumId }: CreateTrackDto,
  ): Observable<TrackModel> {
    return this.trackService.createTrack(name, duration, artistId, albumId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @UsePipes(new IdPipe())
  updateTrack(
    @Param() { id }: { id: string },
    @Body() { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Observable<TrackModel> {
    return this.trackService.updateTrack(id, name, duration, artistId, albumId);
  }

  @Delete(':id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() { id }: { id: string }): Observable<TrackModel> {
    return this.trackService.deleteTrack(id);
  }
}
