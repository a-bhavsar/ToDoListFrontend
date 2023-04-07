import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { List } from '../utils/list.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit{

  constructor(private route : ActivatedRoute, private router : Router, private listService : ListService){

  }



  currentTitle! : string | undefined | null;
  currentDescription! : string | undefined | null;

  editList = new FormGroup(
    {
      title : new FormControl(this.currentTitle, Validators.required),
      description : new FormControl(this.currentDescription, Validators.required)
    }
  )
  userId! : number;
  listId! : number;


  ngOnInit(){
    this.route.params.subscribe((params : Params)=> {
      this.listId = params["listId"];
      let user = localStorage.getItem("user");
      if(user!==null){
        this.userId = JSON.parse(user).id;
      }
      this.listService.getList(this.userId, this.listId).subscribe((data)=> {
        this.currentTitle = (data.data as List).title;
        console.log(this.currentTitle);
        this.currentDescription = (data.data as List).description;
        this.editList.patchValue({
          title : this.currentTitle,
          description : this.currentDescription
        })
      });
    })
  }

  onSubmit(){

  }

  backToList(){
    this.router.navigate(["../../"], {relativeTo : this.route });
  }

  updateList(){
    this.listService.updateList(this.userId, this.listId, this.editList.value).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
      this.router.navigate(["../../"], {relativeTo : this.route})
    }, (err)=> {
      Swal.fire("Oops!", err.error.message, "error");
    });
  }

  get title(){
    return this.editList.get("title");
  }
  get description(){
    return this.editList.get("description");
  }
}
