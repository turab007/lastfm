import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AppService } from '../app.service';
import { Artist } from '../artist.model';
import { Track } from '../track.model';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {

  artist: Artist;
  tracks:Track[];

  constructor(private activatedRoute: ActivatedRoute, private appservice: AppService) {

    this.activatedRoute.queryParams.subscribe(params => {
      const mbId = params['mbid'];
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

}
