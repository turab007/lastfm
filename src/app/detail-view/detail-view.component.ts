import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../app.service';
import { Artist } from '../artist.model';
import { Track } from '../track.model';
import { Album } from '../album.model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit, OnChanges {

  artist: Artist;
  tracks: Track[];
  albums: Album[]
  @Input() id: string;

  constructor(private activatedRoute: ActivatedRoute, private appservice: AppService) {
    this.getData();
  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {
      let mbId = ' ';
      if (this.id == null) {
        mbId = params['mbid'];

      }
      else if (this.id) {
        mbId = this.id

      }

      if (mbId) {

        this.appservice.getArtist(mbId).subscribe(art => {
          this.artist = (<any>art).artist;
        })

        this.appservice.getToptTracks(mbId).subscribe(art => {
          this.tracks = (<any>art).toptracks.track;
        })
        
        this.appservice.getToptAlbums(mbId).subscribe(albums => {
          this.albums = (<any>albums).topalbums.album;
        })
      }
    });

  }
  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.id) {
      this.getData()
    }

  }

}
