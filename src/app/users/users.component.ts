import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  isAdmin: boolean = false;
  constructor(private _apiService: ApiService, private router:Router, private _cookie:CookieService) { }

  ngOnInit(): void {
    this.isAdmin = this._cookie.get('userType') == 'admin';
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
      }
    ); 
  }

  clickUser(user: User) {
    this.router.navigate(['api/v1/user', user.id]);
  }

}
