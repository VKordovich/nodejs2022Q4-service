import { ArtistModel } from '../artist/artist.model';
import { AlbumModel } from '../album/album.model';
import { TrackModel } from '../track/track.model';

export class FavoritesModel {
  artists: ArtistModel[];
  albums: AlbumModel[];
  tracks: TrackModel[];
}
