import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  catchError,
  forkJoin,
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

  deleteArtist(id: string): Observable<boolean> {
    return forkJoin([
      this.getArtist(id).pipe(
        switchMap((artist) => this.db.deleteArtist(artist)),
      ),
      this.db.getTracks().pipe(
        switchMap((tracks) => from(tracks)),
        single(({ artistId }) => artistId === id),
        tap((track) => {
          track.artistId = null;
        }),
        switchMap((track) => this.db.setTracks(track)),
        catchError(() => {
          throw new HttpException('', HttpStatus.NO_CONTENT);
        }),
      ),
      this.db.getFavs().pipe(
        switchMap(({ artists }) => from(artists)),
        single((artist) => artist.id === id),
        catchError(() => {
          throw new NotFoundException('not fav');
        }),
        switchMap((artist) => this.db.deleteArtistFromFav(artist)),
        catchError(() => {
          throw new HttpException('', HttpStatus.NO_CONTENT);
        }),
      ),
    ]).pipe(map(() => true));
  }
}
