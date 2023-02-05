import { Injectable } from '@nestjs/common';
import { UserModel } from './user/user.model';
import { Observable, of } from 'rxjs';
import { TrackModel } from './track/track.model';
import { ArtistModel } from './artist/artist.model';
import { AlbumModel } from './album/album.model';

@Injectable()
export class DbService {
  private readonly USERS = new Set<UserModel>();
  private readonly TRACKS = new Set<TrackModel>();
  private readonly ARTISTS = new Set<ArtistModel>();
  private readonly ALBUMS = new Set<AlbumModel>();

  //User
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

  //Track
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

  //Artist
  getArtists(): Observable<ArtistModel[]> {
    return of(Array.from(this.ARTISTS));
  }

  setArtist(artist: ArtistModel): Observable<ArtistModel> {
    this.ARTISTS.add(artist);
    return of(artist);
  }

  deleteArtist(artist: ArtistModel): Observable<ArtistModel> {
    this.ARTISTS.delete(artist);
    return of(artist);
  }

  //Album
  getAlbums(): Observable<AlbumModel[]> {
    return of(Array.from(this.ALBUMS));
  }

  setAlbum(album: AlbumModel): Observable<AlbumModel> {
    this.ALBUMS.add(album);
    return of(album);
  }

  deleteAlbum(album: AlbumModel): Observable<AlbumModel> {
    this.ALBUMS.delete(album);
    return of(album);
  }
}
