import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../utils/data.model';
import { List } from '../utils/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8080/todolist/users/";

  getAllLists(userId : number){
    return this.http.get<Data>(`${this.baseUrl}${userId}/lists`)
  }

  createList(userId : number, list : List){
    return this.http.post<Data>(`${this.baseUrl}${userId}/lists`, list);
  }
}
