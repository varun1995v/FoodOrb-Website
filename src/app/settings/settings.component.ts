import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class SettingsComponent implements OnInit {

  public addresses: string[] = [];
  public cards: string[] = [];
  public users: User[] = [];
  public currentUserName: string;
  currUser: User;

  public addressAdded: boolean;
  public cardAdded: boolean;
  public addressAddTry: boolean = false;
  public cardAddTry: boolean = false;

  constructor(private _apiService: ApiService,
    private _cookie:CookieService) { }

  ngOnInit(): void {
    this.currentUserName = this._cookie.get('logUser');
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.users.forEach( (user) => {
          if (user.name == this.currentUserName) {
            this.currUser = user;
            this.addresses = user.addresses;
            this.cards = user.cards;
          }
        });
          
      }
    );   
  }
  
  addAddress(address: string) {
    this.users.forEach( (user) => {
      if (user.id == this.currUser.id) {
        user.addresses[user.addresses.length] = address;
        this.addressAdded = this._apiService.updateSettings(user);
      }
    });
    this.addressAddTry = true;
  }

  addCard(card: string) {
    this.users.forEach( (user) => {
      if (user.id == this.currUser.id) {
        user.cards.push(card);
        this.cardAdded = this._apiService.updateSettings(user);
      }
    });
    this.cardAddTry = true;
  }

}
