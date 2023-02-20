import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  getAllAlbums(): Observable<unknown> {
    return from(this.prisma.album.findMany());
  }

  getAlbum(id: string): Observable<any> {
    return from(this.prisma.album.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new NotFoundException('Album not found');
      }),
    );
  }

  createAlbum(name: string, year: number, artistId?: string): Observable<any> {
    const data = { name, year, artistId: artistId ?? null };
    return from(this.prisma.album.create({ data }));
  }

  updateAlbum(
    id: string,
    name?: string,
    year?: number,
    artistId?: string,
  ): Observable<any> {
    return this.getAlbum(id).pipe(
      switchMap((album) =>
        from(
          this.prisma.album.update({
            where: { id },
            data: {
              name: name ?? album.name,
              year: year ?? album.year,
              artistId: artistId ?? album.artistId,
            },
          }),
        ),
      ),
    );
  }

  deleteAlbum(id: string): Observable<boolean> {
    return forkJoin([
      this.getAlbum(id).pipe(
        switchMap(() => from(this.prisma.album.delete({ where: { id } }))),
      ),
    ]).pipe(map(() => true));
  }
}
