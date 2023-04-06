import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../utils/data.model';
import Swal from 'sweetalert2';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../utils/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  hasUser = new BehaviorSubject<boolean>(false);
  userData = new Subject<Data>();

  constructor(private http: HttpClient, private router : Router) {

  }

  baseUrl = "http://localhost:8080/todolist";

  createUser(user : Data){
     this.http.post(this.baseUrl + "/users", user).subscribe((response) => {
      let responseData = response as Data
      if(responseData.message==="User Created"){
         Swal.fire('Yikes!', responseData.message, 'success');
         localStorage.setItem("user", JSON.stringify(responseData.data));
         this.hasUser.next(true)
         this.userData.next(responseData.data as Data);
      }

    }, (error)=> {
      Swal.fire("Oops", error.error.message, "error");
    })
  }

  loginUser(user : Data){
    this.http.post(this.baseUrl + "/users/login", user).subscribe((response)=> {
      let responseData = response as Data;
      if(responseData.message==="Logged In successfully"){
        Swal.fire("Yikes!", responseData.message, "success");
        localStorage.setItem("user", JSON.stringify(responseData.data));
        this.hasUser.next(true);
        this.userData.next(responseData.data as Data);
      }
    },
    (error)=> {
      Swal.fire("Oops!", error.error.message, "error");
    })
  }

  updateUser(user : User, userId : number){
    this.getSingleUser(userId).subscribe((data)=> {
      let currentUser = (data as Data).data;
      if(user.password===(currentUser as User).password){
        this.http.put(this.baseUrl + "/users/" + userId, {...user, password : user.newPassword}).subscribe((data) => {
          const responseData = data as Data;
          Swal.fire("Yikes!", responseData.message, "success");
        }, (err)=> {
          const errorData = err as Data;
          Swal.fire("Oops!", err.message, "error")
        })
      }
      else{
        Swal.fire("Oops!", "Incorrect Password", "error");
      }
    }, (err)=> {
      const errorData = err as Data;
      Swal.fire("Oops!", errorData.message, "error")
    });
  }

  deleteUser(userId : number){
    this.http.delete<Data>(this.baseUrl+"/users/"+userId).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
    })
    this.logout();
  }

  getSingleUser(userId : number){
    return this.http.get(this.baseUrl + "/users/" + userId)
  }

  logout(){
    localStorage.removeItem("user");
    this.hasUser.next(false);
    this.router.navigate(["register"]);
  }

}
