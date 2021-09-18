export class Artist {
    'name': string;
    'listeners'?: number;
    'mbid': string;
    'url': string;
    'image': image[];
    'stats'?:stats

}

export class image {
    'link': string;
    'size': string;
}

export class stats {
'listeners':number;
'playcount':number;
}