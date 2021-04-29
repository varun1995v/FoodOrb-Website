import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})

export class LoginComponent implements OnInit {

  loginError: boolean = false;
  loginCheck: boolean = false;
  username: string;
  public users: User[] = [];

  constructor(private _apiService: ApiService,
    private router:Router, private _cookie:CookieService) { }

  ngOnInit(): void {
  }

  doLogin(email: string, password: string) {
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.users.forEach( (user) => {
          if (user.email === email && user.password == password && this.loginCheck==false) {
            this.loginCheck = true;
            this.username = user.name;
            this._cookie.set('logUser', this.username);
            if (user.type == 'Admin') {
              this._cookie.set('userType', 'admin');
            } else {
              this._cookie.set('userType', 'user');
            }
          }
          
        });
        if (!this.loginCheck) {
          this.loginError = true;
        } else {
          this.loginError = false;
          this._cookie.set('logUser', this.username);
          this.router.navigate(['api/v1/feed','yes']);
        } 
          
      }
    );    
  }

}

