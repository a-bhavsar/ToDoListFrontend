import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn : boolean = false;

  constructor(private userService : UserService, private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Promise((res,rej)=>{
        this.userService.hasUser.subscribe((data)=> {
          this.isLoggedIn = data;
          if(this.isLoggedIn){
            this.router.navigate(["list"]);
          }
          res(!this.isLoggedIn)
        },(err)=>{
          rej(err);
        })
      })
  }

}
