import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListService } from '../services/list.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit{

  constructor(private listService : ListService, private router : Router){

  }

  addListForm = new FormGroup({
    title : new FormControl("", Validators.required),
    description : new FormControl("", Validators.required)
  })

  userId! : number;

  get title(){
    return this.addListForm.get("title");
  }

  get description(){
    return this.addListForm.get("description");
  }

  ngOnInit(){
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
  }

  onSubmit(){
    this.listService.createList(this.userId, this.addListForm.value).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
      this.router.navigate(["list"]);
    });
  }

}
