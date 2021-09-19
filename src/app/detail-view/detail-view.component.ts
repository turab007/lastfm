import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../app.service';
import { Artist } from '../artist.model';
import { Track } from '../track.model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit, OnChanges {

  artist: Artist;
  tracks: Track[];
  @Input() id: string;

  constructor(private activatedRoute: ActivatedRoute, private appservice: AppService) {
    this.getData();
  }

  getData() {
    this.activatedRoute.queryParams.subscribe(params => {
      let mbId = '';
      if (!this.id) {
        mbId = params['mbid'];

      }
      else {
        mbId = this.id

      }
      console.log(mbId);

      this.appservice.getArtist(mbId).subscribe(art => {
        this.artist = (<any>art).artist;
      })

      this.appservice.getToptTracks(mbId).subscribe(art => {
        this.tracks = (<any>art).toptracks.track;
      })

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
