import { Component, OnChanges, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Hotel } from 'src/models/Hotel';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class FeedComponent implements OnInit, OnChanges {

  username: string = '';
  hasLoggedIn: boolean = false;
  public users: User[] = [];
  isAdmin: boolean = false;
  currUser: User;

  constructor(private _apiService: ApiService, private router:Router, 
    private _cookie:CookieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('state') == "yes") {
      this.hasLoggedIn = true;
    }
    this.username = this._cookie.get('logUser');
    if (this.username != null && this.username != '') {
      this.hasLoggedIn = true;
    } else {
      this.hasLoggedIn = false;
    }

    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.users.forEach( (user) => {
          if (user.type == 'Admin' && user.name == this.username) {
            this.isAdmin = true;
          }
          if (user.name == this.username) {
            this.currUser = user;
          }
        });
      }
    ); 
  }

  ngOnChanges(): void {
    this.username = this._cookie.get('logUser');
    console.log(this.username);
    if (this.username != null && this.username != '') {
      this.hasLoggedIn = true;
    } else {
      this.hasLoggedIn = false;
    }
  }

  searchHotel(location: number) {
    this.router.navigate(['api/v1/foodlisting', location]);   
  }

  viewProfile() {
    this.router.navigate(['api/v1/user/', this.currUser.id])
  }

}
