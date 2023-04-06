import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { List } from '../utils/list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  constructor(private listService : ListService){

  }

  userId! : number;
  lists! : List[];

  ngOnInit(){
    let user = localStorage.getItem("user");
    if(user!==null){
      this.userId = JSON.parse(user).id;
    }
    this.listService.getAllLists(this.userId).subscribe((data)=> {
      this.lists = data.data as List[];
      console.log(this.lists);
    });
  }
}
