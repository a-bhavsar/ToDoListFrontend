import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{

  constructor(private router : Router, private route : ActivatedRoute, private taskService : TaskService){

  }

  addTaskForm = new FormGroup({
    title : new FormControl("", Validators.required),
    description : new FormControl("", Validators.required),
    startDate : new FormControl("", Validators.required),
    endDate : new FormControl("", Validators.required)
  })

  userId! : number;
  listId! : number;

  ngOnInit(){
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
    this.listId = this.route.snapshot.params["listId"];
    this.route.params.subscribe((params : Params) => {
      this.listId = params["listId"];
    })
  }

  onSubmit(){
    console.log(this.addTaskForm.value);
    this.taskService.createTask(this.userId, this.listId, this.addTaskForm.value).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
      this.router.navigate(["../"], {relativeTo : this.route});
    }, (err)=> {
      Swal.fire("Oops!", err.error.message, "error");
    });
  }

  backToTask(){
    this.router.navigate(["../"], {relativeTo : this.route})
  }

  get title(){
    return this.addTaskForm.get("title");
  }

  get description(){
    return this.addTaskForm.get("description");
  }
}
