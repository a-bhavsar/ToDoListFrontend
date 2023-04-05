import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../utils/user.model';
import { UserService } from '../services/user.service';
import { repeat } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  ngOnInit(): void {

  }

  userId!: number ;

  constructor(private router : Router, private http : HttpClient, private userService : UserService, private route : ActivatedRoute){

  }
  tempData!:User[];


  registerForm = new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),
    mobileNo : new FormControl("", Validators.required),
  })
   onSubmit(){
    localStorage.clear();
     this.userService.createUser(this.registerForm.value as User)
    this.userService.userData.subscribe((response)=>{
      let user = localStorage.getItem("user");
      if(user!==null){
        this.userId = JSON.parse(user).id;
      }
      this.router.navigate(["../", "users", this.userId], {relativeTo : this.route});

    })
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get mobileNo() { return this.registerForm.get('mobileNo'); }
}
