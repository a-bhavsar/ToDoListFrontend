import { Component, OnInit } from '@angular/core';
import { Task } from '../utils/task.model';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{

  tasks : Task[] = [];

  constructor(private taskService : TaskService, private route : ActivatedRoute, private router : Router){

  }
  userId! : number;
  listId! : number;
  ngOnInit(): void {
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
    this.listId = this.route.snapshot.params["listId"];
    this.route.params.subscribe((params : Params)=> {
      this.listId = params["listId"];
      this.taskService.getAllTasks(this.userId, this.listId).subscribe((data)=> {
        this.tasks = (data.data as Task[]);
      })
    })

  }

  deleteTask(task : Task){
    this.taskService.deleteTask(this.userId, this.listId, (task.id as number)).subscribe((data)=> {
      Swal.fire("Yikes!", data.message, "success");
      this.taskService.getAllTasks(this.userId, this.listId).subscribe((data)=> {
        this.tasks = (data.data as Task[]);
      }
    );
    }, (err)=> {
      Swal.fire("Oops!", err.error.message, "error");
    });
  }

  backToLists(){
    this.router.navigate(["../../"],{relativeTo : this.route});
  }
}
