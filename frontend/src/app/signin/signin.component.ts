import { Component} from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService} from '../../app/services/authentication.service'
import {SocketService} from '../../app/services/socket.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent  {
       User={
      username:'',
      password:''
    };

    errorMsg='';

 constructor(private _auth:AuthenticationService,private _socket:SocketService,private _router:Router) { }
// private _auth:AuthenticationService,private _socket:SocketService,private _router:Router
  // ngOnInit(): void {
  // }

onSubmit(){

    console.log('Validating login..');
    this.errorMsg='';
  this._auth.login(this.User)
    .subscribe(
      data => {
        console.log('Success!', data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('userId', data.id);
        sessionStorage.setItem('username', this.User.username);
        console.log('from login component ID= ' + data.id);
        console.log('from login component - ' + data.token);
        this._socket.emit('connection', 'New user connected!');
        this._router.navigate(['/chat']);

      },
      // error => this.errorMsg = error;
          error =>{ switch(error.status){
                 case 404:
                   this.errorMsg="User not found! Please SIGN UP!"
                   break;
                case 401:
                  this.errorMsg="Invalid Credentials"
                   break;
                default:
                  this.errorMsg="Uknown Server-side Error"
          }

          }
      )
  }
}
