import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../utils/user.model';
import Swal from 'sweetalert2';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  hasUser = new BehaviorSubject<boolean>(false);
  userData = new Subject<User>();

  constructor(private http: HttpClient) {

  }

  baseUrl = "http://localhost:8080/todolist";

  createUser(user : User){
     this.http.post(this.baseUrl + "/users", user).subscribe((response) => {
      console.log(response);
      let responseData = response as User
      if(responseData.message==="User Created"){
        //  Swal.fire('Yikes!', responseData.message, 'success');
         localStorage.setItem("user", JSON.stringify(responseData.data));
         this.userData.next(responseData.data as User);
        //  this.hasUser.next(true)
      }

    }, (error)=> {
      // Swal.fire("Oops", error.error.message, "error");
    })
    this.hasUser.next(true);
  }

  loginUser(user : User){
    this.http.post(this.baseUrl + "/users/login", user).subscribe((response)=> {
      let responseData = response as User;
      if(responseData.message==="Logged In successfully"){
        Swal.fire("Yikes!", responseData.message, "success");
        localStorage.setItem("user", JSON.stringify(responseData.data));
      }
    },
    (error)=> {
      Swal.fire("Oops!", error.error.message, "error");
    })
    this.hasUser.next(true);
  }

  updateUser(user : User, userId : number){
    this.http.put(this.baseUrl+"/users/" + userId, user).subscribe((data)=> {
      console.log(data);
    })
  }

  deleteUser(userId : number){
    this.http.delete(this.baseUrl+"/users/"+userId).subscribe((data)=> {
      console.log(data);
    })
  }


}
