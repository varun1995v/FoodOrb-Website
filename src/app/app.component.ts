import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'foodOrb';
  loggedIn: boolean = false;

  constructor (private _apiService: ApiService,
    private router:Router, private _cookie: CookieService) {}

    ngOnInit(): void {
      this.loggedIn = this._cookie.get('logUser')!='';
    }

    ngOnChanges(): void {
      this.loggedIn = this._cookie.get('logUser')!='';
    }

    logOut() {
      this._cookie.set('logUser', '');
      this._cookie.set('userType', '');
      this.loggedIn = false;
      this.router.navigate(['api/v1/feed']);
    }


}
