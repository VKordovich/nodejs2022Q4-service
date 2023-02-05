import { v4 as uuidv4 } from 'uuid';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId ?? null;
    this.albumId = albumId ?? null;
  }
}
