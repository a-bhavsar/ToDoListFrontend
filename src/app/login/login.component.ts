import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../utils/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService : UserService){

  }

  onSubmit(){

    // console.log(this.loginForm);
    this.userService.loginUser(this.loginForm.value as User);

  }
  loginForm = new FormGroup(
    {
      username : new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    }
  );
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }
}
