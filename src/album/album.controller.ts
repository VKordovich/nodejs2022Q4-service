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
import { Observable } from 'rxjs';
import { IdPipe } from '../pipes/id.pipe';
import { AlbumService } from './album.service';
import { AlbumModel } from './album.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAllTracks(): Observable<AlbumModel[]> {
    return this.albumService.getAllAlbums();
  }

  @UsePipes(new IdPipe())
  @Get(':id')
  getTrack(@Param() { id }: { id: string }): Observable<AlbumModel> {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  createTrack(
    @Body() { name, year, artistId }: CreateAlbumDto,
  ): Observable<AlbumModel> {
    return this.albumService.createAlbum(name, year, artistId);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @UsePipes(new IdPipe())
  updateTrack(
    @Param() { id }: { id: string },
    @Body() { name, year, artistId }: UpdateAlbumDto,
  ): Observable<AlbumModel> {
    return this.albumService.updateAlbum(id, name, year, artistId);
  }

  @Delete(':id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() { id }: { id: string }): Observable<AlbumModel> {
    return this.albumService.deleteAlbum(id);
  }
}