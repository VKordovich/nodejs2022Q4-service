import { Injectable, NotFoundException } from '@nestjs/common';
import { catchError, forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  getAllArtists(): Observable<any> {
    return from(this.prisma.artist.findMany());
  }

  getArtist(id: string): Observable<any> {
    return from(this.prisma.artist.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }

  createArtist(name: string, grammy: boolean): Observable<any> {
    const data = { name, grammy };
    return from(this.prisma.artist.create({ data }));
  }

  updateArtist(id: string, name?: string, grammy?: boolean): Observable<any> {
    return this.getArtist(id).pipe(
      switchMap((artist) =>
        from(
          this.prisma.artist.update({
            where: { id },
            data: {
              name: name ?? artist.name,
              grammy: grammy ?? artist.grammy,
            },
          }),
        ),
      ),
    );
  }

  deleteArtist(id: string): Observable<boolean> {
    return forkJoin([
      this.getArtist(id).pipe(
        switchMap(() => from(this.prisma.artist.delete({ where: { id } }))),
      ),
    ]).pipe(map(() => true));
  }
}
