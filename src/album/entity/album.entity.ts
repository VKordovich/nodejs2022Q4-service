import { v4 as uuidv4 } from 'uuid';

export class Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(name: string, year: number, artistId?: string) {
    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId ?? null;
  }
}
