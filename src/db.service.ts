import { Injectable } from '@nestjs/common';
import { UserModel } from './user/user.model';
import { Observable, of } from 'rxjs';
import { TrackModel } from './track/track.model';

@Injectable()
export class DbService {
  private readonly USERS = new Set<UserModel>();
  private readonly TRACKS = new Set<TrackModel>();

  getUsers(): Observable<UserModel[]> {
    return of(Array.from(this.USERS));
  }

  setUsers(user: UserModel): Observable<UserModel> {
    this.USERS.add(user);
    return of(user);
  }

  deleteUser(user: UserModel): Observable<UserModel> {
    this.USERS.delete(user);
    return of(user);
  }

  getTracks(): Observable<TrackModel[]> {
    return of(Array.from(this.TRACKS));
  }

  setTracks(track: TrackModel): Observable<TrackModel> {
    this.TRACKS.add(track);
    return of(track);
  }

  deleteTrack(track: TrackModel): Observable<TrackModel> {
    this.TRACKS.delete(track);
    return of(track);
  }
}
