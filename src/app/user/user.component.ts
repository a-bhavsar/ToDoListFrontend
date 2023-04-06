import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

  constructor(private router : Router, private userService : UserService){

  }

  username! : string;
  mobileNumber! : string;
  userId! : number;
  ngOnInit(): void {
    let user = localStorage.getItem("user");
    if(user!==null){
      this.username = JSON.parse(user).username;
      this.mobileNumber = JSON.parse(user).mobileNo;
      this.userId = JSON.parse(user).id;
    }
    this.userService.userData.subscribe((response)=>{
      let user = localStorage.getItem("user");
      if(user!==null){
        this.userId = JSON.parse(user).id;
      }
    })
  }

  deleteUser(){
    this.userService.deleteUser(this.userId);
  }

}
