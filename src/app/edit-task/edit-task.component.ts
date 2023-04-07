import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../utils/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit{

  constructor(private router : Router, private route : ActivatedRoute, private taskService : TaskService){

  }

  editTask = new FormGroup({
    title : new FormControl("", Validators.required),
    description : new FormControl("", Validators.required)
  })

  userId! : number;
  listId! : number;
  taskId! : number;

  ngOnInit(){
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
    this.listId = this.route.snapshot.params["listId"];
    this.taskId = this.route.snapshot.params["taskId"];
    this.route.params.subscribe((params : Params)=> {
      this.listId = params['listId'];
      this.taskId = params['taskId'];
      this.taskService.getTask(this.userId, this.listId, this.taskId).subscribe((data)=> {
        this.editTask.patchValue({
          title : (data.data as Task).title,
          description : (data.data as Task).description
        })
      })
    })

  }

  updateTask(){
    this.taskService.updateTask(this.userId, this.listId, this.taskId, this.editTask.value).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
      this.router.navigate(["../../"], {relativeTo : this.route});
    }, (err)=> {
      Swal.fire("Oops", err.error.message, "error");
    }
    );
  }

  backToTask(){
    this.router.navigate(["../../"], {relativeTo : this.route});
  }

  get title(){
    return this.editTask.get("title");
  }

  get description(){
    return this.editTask.get("description");
  }
}
