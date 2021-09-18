import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  API_KEY = '3bc9f02350021e777d20a10f604e28b0';

  getArtists(country: string) {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${this.API_KEY}&format=json&limit=10`)
  }

  getArtist(mbId: string) {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&mbid=${mbId}&api_key=${this.API_KEY}&format=json&limit=10`)
  }

  getToptTracks(mbId: string) {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${mbId}&api_key=${this.API_KEY}&format=json&limit=5`)
  }

  getToptAlbums(mbId: string) {
    return this.http.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&mbid=${mbId}&api_key=${this.API_KEY}&format=json&limit=5`)
  }

  searchArtist(artistName: string) {
    let name: string;
    if (artistName)
      name = artistName
    else name = ' '
    return this.http
      .get<any>(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${this.API_KEY}&format=json&limit=5`)
      .pipe(map((data) => (data.results.artistmatches.artist)));
  }
}
