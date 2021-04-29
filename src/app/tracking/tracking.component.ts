import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'src/models/Order';
import { OrderDetail } from 'src/models/OrderDetail';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class TrackingComponent implements OnInit {

  constructor( private route: ActivatedRoute, private _cookie:CookieService) { }
  public orderDetail: OrderDetail
  public orderNum: number;
  public user: string;

  ngOnInit(): void {
    this.user = this._cookie.get('logUser')!='' ? this._cookie.get('logUser') : "Guest"
    this.orderNum = parseInt(this.route.snapshot.paramMap.get('oid'));
    this.orderDetail = {
      user: this._cookie.get('logUser'),
      items: [],
      address: '',
      payment: '',
      amount: 0,
      timer: this.time,
      status: 'PLACED'
    }
    this.startTimer();
  }

  public time: number = 0;
  public wait: number;
  interval;

 startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.wait = 16 - this.time;
    }, 1000);
  }

}
