import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../utils/data.model';
import { Task } from '../utils/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:8080/todolist";

  getAllTasks(userId : number, listId : number){
    return this.http.get<Data>(`${this.baseUrl}/users/${userId}/lists/${listId}/tasks`);
  }

  createTask(userId : number, listId : number, task : Task){
    return this.http.post<Data>(`${this.baseUrl}/users/${userId}/lists/${listId}/tasks`, task);
  }

  updateTask(userId : number, listId : number, taskId : number, task : Task){
    return this.http.put<Data>(`${this.baseUrl}/users/${userId}/lists/${listId}/tasks/${taskId}`, task);
  }

  getTask(userId : number, listId : number, taskId : number){
    return this.http.get<Data>(`${this.baseUrl}/users/${userId}/lists/${listId}/tasks/${taskId}`);
  }

  deleteTask(userId : number, listId : number, taskId : number){
    return this.http.delete<Data>(`${this.baseUrl}/users/${userId}/lists/${listId}/tasks/${taskId}`);
  }
}
