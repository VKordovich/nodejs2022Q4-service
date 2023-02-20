import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  catchError,
  concatAll,
  filter,
  forkJoin,
  from,
  map,
  Observable,
  switchMap,
  tap,
  toArray,
} from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  getAllFavs(): Observable<any> {
    return forkJoin({
      artists: this.getAllFavArtists(),
      albums: this.getAllFavAlbums(),
      tracks: this.getAllFavTrack(),
    });
  }

  getAllFavArtists(): Observable<unknown> {
    const favArtistIds: Set<string> = new Set();
    return from(this.prisma.favorites.findMany()).pipe(
      switchMap((favs: any) => from(favs)),
      filter((res: any) => !!res.artistId),
      tap((fav) => favArtistIds.add(fav.artistId)),
      switchMap(() => from(Array.from(favArtistIds))),
      map((id) =>
        from(
          this.prisma.artist.findUnique({
            where: { id },
          }),
        ),
      ),
      concatAll(),
      toArray(),
    );
  }

  getAllFavAlbums(): Observable<unknown> {
    const favAlbumIds: Set<string> = new Set();
    return from(this.prisma.favorites.findMany()).pipe(
      switchMap((favs: any) => from(favs)),
      filter((res: any) => !!res.albumId),
      tap((fav) => favAlbumIds.add(fav.albumId)),
      switchMap(() => from(Array.from(favAlbumIds))),
      filter((res) => !!res),
      map((id) =>
        from(
          this.prisma.album.findUnique({
            where: { id },
          }),
        ),
      ),
      concatAll(),
      toArray(),
    );
  }

  getAllFavTrack(): Observable<unknown> {
    const favTrackIds: Set<string> = new Set();
    return from(this.prisma.favorites.findMany()).pipe(
      switchMap((favs: any) => from(favs)),
      filter((res: any) => !!res.trackId),
      tap((fav) => favTrackIds.add(fav.trackId)),
      switchMap(() => from(Array.from(favTrackIds))),
      filter((res) => !!res),
      map((id) =>
        from(
          this.prisma.track.findUnique({
            where: { id },
          }),
        ),
      ),
      concatAll(),
      toArray(),
    );
  }

  addTrackToFav(id: string): Observable<unknown> {
    return from(this.prisma.track.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new UnprocessableEntityException('Track not found');
      }),
      switchMap((track: any) =>
        from(
          this.prisma.favorites.create({
            data: {
              trackId: track.id,
            },
          }),
        ),
      ),
    );
  }

  deleteTrackFromFav(id: string): Observable<boolean> {
    return from(this.prisma.favorites.delete({ where: { trackId: id } })).pipe(
      catchError(() => {
        throw new NotFoundException('Track not fav');
      }),
      map(() => true),
    );
  }

  addAlbumToFav(id: string): Observable<unknown> {
    return from(this.prisma.album.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new UnprocessableEntityException('Album not found');
      }),
      switchMap((album: any) =>
        from(
          this.prisma.favorites.create({
            data: {
              albumId: album.id,
            },
          }),
        ),
      ),
    );
  }

  deleteAlbumFromFav(id: string): Observable<boolean> {
    return from(this.prisma.favorites.delete({ where: { albumId: id } })).pipe(
      catchError(() => {
        throw new NotFoundException('Album not fav');
      }),
      map(() => true),
    );
  }

  addArtistToFav(id: string): Observable<unknown> {
    return from(this.prisma.artist.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new UnprocessableEntityException('Artist not found');
      }),
      switchMap((artist: any) =>
        from(
          this.prisma.favorites.create({
            data: {
              artistId: artist.id,
            },
          }),
        ),
      ),
    );
  }

  deleteArtistFromFav(id: string): Observable<boolean> {
    return from(this.prisma.favorites.delete({ where: { artistId: id } })).pipe(
      catchError(() => {
        throw new NotFoundException('Artist not fav');
      }),
      map(() => true),
    );
  }
}
