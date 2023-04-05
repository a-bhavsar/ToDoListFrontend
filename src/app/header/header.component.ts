import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  hasUser!: boolean;

  userId! : number;

  constructor(private userService : UserService){

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
          console.log(JSON.parse(user));
          this.userId = JSON.parse(user).id;
          console.log(this.userId);
        }
      }
    },err=>{
      // Swal.fire
    })
  }

  onLogout(){
    localStorage.removeItem("user");
    this.userService.hasUser.next(false);
  }

}
