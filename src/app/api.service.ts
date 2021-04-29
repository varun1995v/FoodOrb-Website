import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from 'src/models/friends';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  static userId: number = 6;
  public users: Observable<any>;
  friends: Friend[] = [];
  emptyStrings: string[] = [];
  constructor(private http: HttpClient) { 

  }

  getUsers(): Observable<any> {
    return this.http.get<any>("/assets/users.json");
  }

  getHotels(): Observable<any> {
    return this.http.get<any>("/assets/hotels.json");
  }

  registerUser(user: User): boolean {
    const axios = require('axios');
    ApiService.userId= ApiService.userId+1;
    axios
      .post('http://localhost:3000/users', {
          name: user.name,
          phone: user.phone,
          type: 'Registered',
          email: user.email,
          friends: this.friends,
          image: "/assets/avatar1.png",
          password: user.password,
          addresses: this.emptyStrings,
          cards: this.emptyStrings
        })
      .then(resp => { console.log(resp.data); })
      .catch(error => { console.log(error); });  
    return true;
  }

  updateFriend(user: User, friendId: number): boolean {
    var alreadyFriend = false;
    user.friends.forEach( friend => {
      if (friend.id == friendId) {
        console.log(user.id);
        console.log(friendId);
        alreadyFriend = true;
      }
    });
    if (!alreadyFriend) {
      user.friends.push({ "id": friendId });
      const axios = require('axios');
      axios
        .put('http://localhost:3000/users/' + user.id, {
          name: user.name,
          phone: user.phone,
          type: user.type,
          email: user.email,
          friends: user.friends,
          image: user.image,
          password: user.password,
          cards: user.cards,
          addresses: user.addresses
        })
        .then(resp => { console.log(resp.data); })
        .catch(error => { console.log(error); });
      return true;
    }
    return false;
  }

  updateSettings(user: User): boolean {
    const axios = require('axios');
    axios
        .put('http://localhost:3000/users/' + user.id, {
          name: user.name,
          phone: user.phone,
          type: user.type,
          email: user.email,
          friends: user.friends,
          image: user.image,
          password: user.password,
          addresses: user.addresses,
          cards: user.cards
        })
        .then(resp => { console.log(resp.data); })
        .catch(error => { console.log(error); });
    return true;
  }

}
