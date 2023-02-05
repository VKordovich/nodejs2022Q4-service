import { CreateArtistDto } from './dto/create-artist.dto';
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
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './artist.service';
import { Observable } from 'rxjs';
import { ArtistModel } from './artist.model';
import { IdPipe } from '../pipes/id.pipe';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAllTracks(): Observable<ArtistModel[]> {
    return this.artistService.getAllArtists();
  }

  @UsePipes(new IdPipe())
  @Get(':id')
  getTrack(@Param() { id }: { id: string }): Observable<ArtistModel> {
    return this.artistService.getArtist(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  createTrack(
    @Body() { name, grammy }: CreateArtistDto,
  ): Observable<ArtistModel> {
    return this.artistService.createArtist(name, grammy);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @UsePipes(new IdPipe())
  updateTrack(
    @Param() { id }: { id: string },
    @Body() { name, grammy }: UpdateArtistDto,
  ): Observable<ArtistModel> {
    return this.artistService.updateArtist(id, name, grammy);
  }

  @Delete(':id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() { id }: { id: string }): Observable<ArtistModel> {
    return this.artistService.deleteArtist(id);
  }
}
