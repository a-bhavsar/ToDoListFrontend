import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Data } from '../utils/data.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  constructor(private userService: UserService, private router : Router, private route : ActivatedRoute) {}
  user = localStorage.getItem('user');
  currentUsername: string = JSON.parse(this.user as string).username;
  currentMobileNo: string = JSON.parse(this.user as string).mobileNo;
  userId! : number;
  updateForm = new FormGroup({
    username: new FormControl(this.currentUsername, Validators.required),
    password: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    mobileNo: new FormControl(this.currentMobileNo, Validators.required)
  });

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (user !== null) {
      this.currentUsername = JSON.parse(user).username;
      this.currentMobileNo = JSON.parse(user).mobileNo;
      this.userId = JSON.parse(user).id;
    }
    this.userService.userData.subscribe((response) => {
      let user = localStorage.getItem('user');
      if (user !== null) {
        this.currentUsername = JSON.parse(user).username;
        this.currentMobileNo = JSON.parse(user).mobileNo;
        this.userId = JSON.parse(user).id;
      }
    });
  }

  onSubmit(){
    console.log(this.updateForm.value);
    this.userService.updateUser(this.updateForm.value, this.userId);
  }

  get username() {
    return this.updateForm.get('username');
  }
  get password() {
    return this.updateForm.get('password');
  }
  get newPassword() {
    return this.updateForm.get('newPassword');
  }
  get mobileNo() {
    return this.updateForm.get('mobileNo');
  }

  backToProfile(){
    this.router.navigate(['../'], {relativeTo : this.route})
  }
}
