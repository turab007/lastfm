import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AppService } from '../app.service';
import { Artist } from '../artist.model'
import { Router } from '@angular/router';


@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

  artist1 = new FormControl();
  artist2 = new FormControl();

  artist1Filter: Observable<any[]>;
  artist2Filter: Observable<any[]>;

  constructor(private appService: AppService, private router: Router) {

    this.artist1Filter = this.artist1.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(this.artist1.value || '');
      })
    );

    this.artist2Filter = this.artist2.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(this.artist2.value || '');
      })
    );

  }
  ngOnInit(): void {
  }


  filter( formvalue: string): Observable<Artist[]> {
    console.log('I am filtering ', formvalue)
    return this.appService.searchArtist(formvalue).pipe(
      map((response) =>
        response.filter((option) => {
          return option.name.toLowerCase().indexOf(formvalue.toLowerCase()) === 0;
        })
      )
    );
  }


  openDetail(mbid: string, action: string) {
    if (action === 'det') {
      this.artist1.reset()
      this.router.navigate(['/detail'], { queryParams: { mbid: mbid } })
    }
    else if (action === 'comp') {
      this.router.navigate(['/compare'])
    }
    else if (action === 'main') {
      this.router.navigate(['/main'])
    }
  }
}
