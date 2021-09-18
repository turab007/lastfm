import { Component, OnInit } from '@angular/core';
import { AppService } from '.././app.service';
import { Artist } from '../artist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) {
    this.getArtistsData();
  }

  getArtistsData() {
    this.appService.getArtists(this.selectedValue).subscribe(res => {
      this.artists = (<any>res).topartists.artist;
    })
  }
  ngOnInit(): void {
  }

  openDetail(mbid: string) {
    this.router.navigate(['/detail'], { queryParams: { mbid: mbid } })
  }
  artists: Artist[] = [];
  countries = [
    { value: 'germany', viewValue: 'Germany (+49)' },
    { value: 'italy', viewValue: 'Italy (+39)' },
    { value: 'spain', viewValue: 'Spain (+34)' }
  ];
  selectedValue = this.countries[0].value;

}
