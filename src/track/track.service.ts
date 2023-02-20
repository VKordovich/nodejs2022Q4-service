import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  getAllTracks(): Observable<any> {
    return from(this.prisma.track.findMany());
  }

  getTrack(id: string): Observable<any> {
    return from(this.prisma.track.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new NotFoundException('Track not found');
      }),
    );
  }

  createTrack(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): Observable<any> {
    const data = {
      name,
      duration,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
    };
    return from(this.prisma.track.create({ data }));
  }

  updateTrack(
    id: string,
    name?: string,
    duration?: number,
    artistId?: string | null,
    albumId?: string | null,
  ): Observable<any> {
    return this.getTrack(id).pipe(
      switchMap((track) =>
        from(
          this.prisma.track.update({
            where: { id },
            data: {
              name: name ?? track.name,
              duration: duration ?? track.duration,
              artistId: artistId ?? track.artistId,
              albumId: albumId ?? track.albumId,
            },
          }),
        ),
      ),
    );
  }

  deleteTrack(id: string): Observable<boolean> {
    return forkJoin([
      this.getTrack(id).pipe(
        switchMap(() => from(this.prisma.track.delete({ where: { id } }))),
      ),
    ]).pipe(map(() => true));
  }
}
