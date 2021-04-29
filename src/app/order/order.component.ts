import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { timeStamp } from 'node:console';
import { runInThisContext } from 'node:vm';
import { Hotel } from 'src/models/Hotel';
import { Item } from 'src/models/Item';
import { OrderDetail } from 'src/models/OrderDetail';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class OrderComponent implements OnInit {

  constructor(private _apiService: ApiService, 
    private route: ActivatedRoute,
    private router:Router,
    private _cookie:CookieService) { }

  orderError: boolean = false;
  public users: User[] = [];
  hotelId: number;
  hotels: Hotel[] = [];
  public items: Item[] = [];
  public selectItems: Item[] = [];
  orderSum: number = 0;
  public addresses: string[];
  public cards: string[];
  public currentUserName: string;
  currUser: User;

  ngOnInit(): void {
    this.currentUserName = this._cookie.get('logUser');
    this.hotelId = parseInt(this.route.snapshot.paramMap.get('oid'));
    this._apiService.getHotels().subscribe(
      data => {
        this.hotels = data.hotels;
        this.hotels.forEach( (hotel) => {
          if (hotel.id == this.hotelId) {
            hotel.items.forEach( (item) => {
                item.quantity=1;
                this.items.push(item);
              }
            );
          }
        });
      }
    );
    this.loadDetails();
  }

  addItem(newItem: Item) {
    this.orderSum = this.orderSum + newItem.price;
    this.selectItems.push(newItem);
  }

  clearCart() {
    this.selectItems = [];
    this.orderSum = 0;
  }

  loadDetails() {
    if (this.currentUserName != '' && this.currentUserName != null) {
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
      })
    }
  }

  checkout(card: string, address: string) {
    if (card=='' || address=='') {
      this.orderError = true;
    } else {
    this.router.navigate(['api/v1/orders/' + this.hotelId + '/status/']);
    }
  }

}
