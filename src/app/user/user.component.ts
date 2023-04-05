import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  username! : string;
  mobileNumber! : string;
  ngOnInit(): void {
    let user = localStorage.getItem("user");
    if(user!==null){
      this.username = JSON.parse(user).username;
      this.mobileNumber = JSON.parse(user).mobileNo;
    }
  }


}
