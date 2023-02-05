import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import {
  catchError,
  from,
  map,
  Observable,
  single,
  switchMap,
  tap,
} from 'rxjs';
import { TrackModel } from './track.model';
import { Track } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  getAllTracks(): Observable<TrackModel[]> {
    return this.db.getTracks();
  }

  getTrack(id: string): Observable<TrackModel> {
    return this.db.getTracks().pipe(
      switchMap((tracks) => from(tracks)),
      single((track) => track.id === id),
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
  ): Observable<TrackModel> {
    const track: TrackModel = new Track(name, duration, artistId, albumId);
    return this.db.setTracks(track);
  }

  updateTrack(
    id: string,
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ): Observable<TrackModel> {
    return this.getTrack(id).pipe(
      tap((track) => this.db.deleteTrack(track)),
      map((track) => {
        return {
          ...track,
          name: name ?? track.name,
          duration: duration ?? track.duration,
          artistId: artistId ?? track.artistId,
          albumId: albumId ?? track.albumId,
        };
      }),
      switchMap((updatedTrack) => this.db.setTracks(updatedTrack)),
    );
  }

  deleteTrack(id: string): Observable<TrackModel> {
    return this.getTrack(id).pipe(
      switchMap((track) => this.db.deleteTrack(track)),
    );
  }
}
