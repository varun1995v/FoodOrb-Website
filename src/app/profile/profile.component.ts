import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _apiService: ApiService, 
  private route: ActivatedRoute,
  private _cookie:CookieService) { }

  public users: User[] = [];
  public user: User;
  isCurrentUser: boolean = false;
  isAdmin: boolean = false;
  
  ngOnInit(): void {

    this.isAdmin = this._cookie.get('userType') == 'admin';
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.user = this.users.find( (u) => { return u.id === parseInt(this.route.snapshot.paramMap.get('uid')) } );
        console.log(this.user.name);
        console.log(this._cookie.get('logUser'));
        this.isCurrentUser = this._cookie.get('logUser') == this.user.name;
      });

  }

}
