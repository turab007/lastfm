import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { AppService } from './app.service';
import { Artist } from './artist.model'
import { Router } from '@angular/router';

// export interface User {
//   name: string;
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  myControl = new FormControl();
  // options:any = [];
  filteredOptions: Observable<any[]>;

  constructor(private appService: AppService, private router: Router) {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val || '');
      })
    );

  }



  // displayFn(user: User): string {
  //   return user && user.name ? user.name : '';
  // }


  filter(val: string): Observable<Artist[]> {
    return this.appService.searchArtist(this.myControl.value).pipe(
      map((response) =>
        response.filter((option) => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0;
        })
      )
    );
  }


  openDetail(mbid: string, action: string) {
    if (action === 'det') {
      this.myControl.reset()
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