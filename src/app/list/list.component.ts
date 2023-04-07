import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../utils/list.model';
import {  Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Data } from '../utils/data.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private listService : ListService){

  }

  userId! : number;
  lists : List[] = [];
  listId! : number;

  ngOnInit(){
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
    this.listService.getAllLists(this.userId).subscribe((data)=> {
      this.lists = data.data as List[];
    });
  }

  deleteList(list : List){
    this.listService.deleteList(this.userId, list.id as number).subscribe((data)=> {
      Swal.fire("Yikes", data.message, "success");
      this.listService.getAllLists(this.userId).subscribe((data)=> {
        this.lists = data.data as List[];
      })
    },
    (err)=> {
      Swal.fire("Oops!", (err.error as Data).message, "error");
    });
  }
}
