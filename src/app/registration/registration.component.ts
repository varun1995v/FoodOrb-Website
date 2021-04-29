declare var require: any

import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class RegistrationComponent implements OnInit {

  formOpen: boolean = true;
  hasRegistered: boolean = false;
  public users: User[] = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
  }

  signUp(user: User) {
    console.log("at signup")
    if (this._apiService.registerUser(user)) {
      this.hasRegistered = true;
    }
    this.formOpen = false;
  }


}
