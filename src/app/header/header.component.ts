import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  hasUser!: boolean;

  userId! : number;

  constructor(private userService : UserService, private router : Router){

  }

  ngOnInit(){

    const user = localStorage.getItem("user");
    if(user===null){
      this.userService.hasUser.next(false);
    }
    else{
      this.userService.hasUser.next(true);
    }
    this.userService.hasUser.subscribe(data => {
      this.hasUser = data;
      if(data===true){
        let user = localStorage.getItem("user");
        if(user!==null){
          this.userId = JSON.parse(user).id;
        }
      }
    },err=>{
      // Swal.fire
    })
  }

  onLogout(){
    this.userService.logout();
    Swal.fire("Yikes!", "Logged out successfully", "success");
  }

}
