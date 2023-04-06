import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListComponent } from './list/list.component';
import { AddListComponent } from './add-list/add-list.component';

const routes: Routes = [
  {
    path : "", component : HomeComponent
  },
  {
    path : "register", component : RegisterComponent
  },
  {
    path : "login", component : LoginComponent
  },
  {
    path : "users/:userId", component : UserComponent
  },
  {
    path : "users/:userId/update", component : UpdateUserComponent
  },
  {
    path : "list", component : ListComponent
  },
  {
    path : "list/add", component : AddListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
