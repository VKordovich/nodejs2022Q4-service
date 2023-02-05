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
import { ArtistModel } from './artist.model';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  getAllArtists(): Observable<ArtistModel[]> {
    return this.db.getArtists();
  }

  getArtist(id: string): Observable<ArtistModel> {
    return this.db.getArtists().pipe(
      switchMap((artists) => from(artists)),
      single((artist) => artist.id === id),
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }

  createArtist(name: string, grammy: boolean): Observable<ArtistModel> {
    const artist: ArtistModel = new Artist(name, grammy);
    return this.db.setArtist(artist);
  }

  updateArtist(
    id: string,
    name?: string,
    grammy?: boolean,
  ): Observable<ArtistModel> {
    return this.getArtist(id).pipe(
      tap((artist) => this.db.deleteArtist(artist)),
      map((artist) => {
        return {
          ...artist,
          name: name ?? artist.name,
          grammy: grammy ?? artist.grammy,
        };
      }),
      switchMap((updatedArtist) => this.db.setArtist(updatedArtist)),
    );
  }

  deleteArtist(id: string): Observable<ArtistModel> {
    return this.getArtist(id).pipe(
      switchMap((artist) => this.db.deleteArtist(artist)),
    );
  }
}
