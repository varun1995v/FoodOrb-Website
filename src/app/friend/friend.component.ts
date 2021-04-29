import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class FriendComponent implements OnInit {

  notFound: boolean = false;
  friendAdded: boolean = false;
  friendError: boolean = false;
  public users: User[] = [];
  public currentUser: string;
  public customers: User[] = [];
  public myId: number;
  public friendSelectedUser: User;
  constructor(private _apiService: ApiService,
    private _cookie:CookieService) { }

  ngOnInit(): void {
    this.currentUser = this._cookie.get('logUser');
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.users.forEach( (user) => {
          if (user.name == this.currentUser) {
            this.myId = user.id;
          }
          if (user.type !== "Admin" && user.name !== this.currentUser) {
            this.customers.push(user);
          }
        });
      }
    ); 
  }

  addFriend(userId: number) {
    this.users.forEach( (user) => {
      if (user.id == userId) {
        this.friendSelectedUser = user;
      }
    });
    this.friendAdded = this._apiService.updateFriend(this.friendSelectedUser, this.myId);
    this.friendError = !this.friendAdded;
  }

}
