import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Observable } from 'rxjs';
import { FavoritesModel } from './favorites.model';
import { IdPipe } from '../pipes/id.pipe';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAllTracks(): Observable<FavoritesModel> {
    return this.favoritesService.getAllFavs();
  }

  @Post('track/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.CREATED)
  addTrackToFav(@Param() { id }: { id: string }): Observable<FavoritesModel> {
    return this.favoritesService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFav(@Param() { id }: { id: string }): Observable<boolean> {
    return this.favoritesService.deleteTrackFromFav(id);
  }

  @Post('album/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFav(@Param() { id }: { id: string }): Observable<FavoritesModel> {
    return this.favoritesService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFav(@Param() { id }: { id: string }): Observable<boolean> {
    return this.favoritesService.deleteAlbumFromFav(id);
  }

  @Post('artist/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.CREATED)
  addArtistToFav(@Param() { id }: { id: string }): Observable<FavoritesModel> {
    return this.favoritesService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFav(@Param() { id }: { id: string }): Observable<boolean> {
    return this.favoritesService.deleteArtistFromFav(id);
  }
}
