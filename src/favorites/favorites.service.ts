import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { catchError, from, Observable, single, switchMap, tap } from 'rxjs';
import { FavoritesModel } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService) {}

  getAllFavs(): Observable<FavoritesModel> {
    return this.db.getFavs();
  }

  addTrackToFav(id: string): Observable<FavoritesModel> {
    return this.db.getTracks().pipe(
      switchMap((tracks) => from(tracks)),
      single((track) => track.id === id),
      catchError(() => {
        throw new UnprocessableEntityException('Track not found');
      }),
      tap((track) => this.db.addTrackToFav(track)),
      switchMap(() => this.db.getFavs()),
    );
  }

  deleteTrackFromFav(id: string): Observable<boolean> {
    return this.db.getFavs().pipe(
      switchMap(({ tracks }) => from(tracks)),
      single((track) => track.id === id),
      catchError(() => {
        throw new NotFoundException('Track not fav');
      }),
      switchMap((track) => this.db.deleteTrackFromFav(track)),
    );
  }

  addAlbumToFav(id: string): Observable<FavoritesModel> {
    return this.db.getAlbums().pipe(
      switchMap((albums) => from(albums)),
      single((album) => album.id === id),
      catchError(() => {
        throw new UnprocessableEntityException('Album not found');
      }),
      tap((album) => this.db.addAlbumToFav(album)),
      switchMap(() => this.db.getFavs()),
    );
  }

  deleteAlbumFromFav(id: string): Observable<boolean> {
    return this.db.getFavs().pipe(
      switchMap(({ albums }) => from(albums)),
      single((album) => album.id === id),
      catchError(() => {
        throw new NotFoundException('Album not fav');
      }),
      switchMap((album) => this.db.deleteAlbumFromFav(album)),
    );
  }

  addArtistToFav(id: string): Observable<FavoritesModel> {
    return this.db.getArtists().pipe(
      switchMap((artists) => from(artists)),
      single((artist) => artist.id === id),
      catchError(() => {
        throw new UnprocessableEntityException('Artist not found');
      }),
      tap((artist) => this.db.addArtistToFav(artist)),
      switchMap(() => this.db.getFavs()),
    );
  }

  deleteArtistFromFav(id: string): Observable<boolean> {
    return this.db.getFavs().pipe(
      switchMap(({ artists }) => from(artists)),
      single((artist) => artist.id === id),
      catchError(() => {
        throw new NotFoundException('Artist not fav');
      }),
      switchMap((artist) => this.db.deleteArtistFromFav(artist)),
    );
  }
}
