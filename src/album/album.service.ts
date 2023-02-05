import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db.service';
import {
  catchError,
  from,
  map,
  Observable,
  single,
  switchMap,
  tap,
} from 'rxjs';
import { AlbumModel } from './album.model';
import { Album } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  getAllAlbums(): Observable<AlbumModel[]> {
    return this.db.getAlbums();
  }

  getAlbum(id: string): Observable<AlbumModel> {
    return this.db.getAlbums().pipe(
      switchMap((albums) => from(albums)),
      single((album) => album.id === id),
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }

  createAlbum(
    name: string,
    year: number,
    artistId?: string,
  ): Observable<AlbumModel> {
    const album: AlbumModel = new Album(name, year, artistId);
    return this.db.setAlbum(album);
  }

  updateAlbum(
    id: string,
    name?: string,
    year?: number,
    artistId?: string,
  ): Observable<AlbumModel> {
    return this.getAlbum(id).pipe(
      tap((album) => this.db.deleteAlbum(album)),
      map((album) => {
        return {
          ...album,
          name: name ?? album.name,
          year: year ?? album.year,
          artistId: artistId ?? album.artistId,
        };
      }),
      switchMap((updatedAlbum) => this.db.setAlbum(updatedAlbum)),
    );
  }

  deleteAlbum(id: string): Observable<AlbumModel> {
    return this.getAlbum(id).pipe(
      switchMap((album) => this.db.deleteAlbum(album)),
    );
  }
}
