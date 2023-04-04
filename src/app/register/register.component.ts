import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
    mobileNo : new FormControl("", Validators.required),
  })
  mode='register'
  @Output() checkMode = new EventEmitter<string>();
  onSubmit(){
    console.log(this.registerForm.value);
  }
  onSwitch(){
    if(this.mode === "register"){
      this.mode='login'
      this.checkMode.emit(this.mode)
    }else{
      this.mode='register',
      this.checkMode.emit(this.mode)
    }
  }
}
