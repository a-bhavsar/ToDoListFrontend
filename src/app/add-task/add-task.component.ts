import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{

  constructor(private router : Router, private route : ActivatedRoute){

  }

  addTaskForm = new FormGroup({
    title : new FormControl("", Validators.required),
    description : new FormControl("", Validators.required)
  })

  ngOnInit(){

  }

  onSubmit(){

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
