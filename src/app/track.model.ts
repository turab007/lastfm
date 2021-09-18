import { Artist,image } from './artist.model';

export class Track {
    'name': string;
    'playcount': number;
    'listeners': number;
    'mbid': string;
    'url': string;
    'streamable': number;
    'artist': Artist[];
    'image': image[]
}
