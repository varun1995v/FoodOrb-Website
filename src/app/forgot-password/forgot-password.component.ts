import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ForgotPasswordComponent implements OnInit {

  emailCheck: boolean = false;
  sendPress: boolean = false;
  
  constructor(private _apiService: ApiService) { }
  public users: User[] = [];

  ngOnInit(): void {
  }

  checkUser(email: string) {
    this._apiService.getUsers().subscribe(
      data => {
        this.users = data.users;
        this.users.forEach( (user) => {
          if (user.email === email ) {
            this.emailCheck = true;
          }
        });
        this.sendPress = true;
      }
    );    
  }

}
