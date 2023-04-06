import { User } from "./user.model";

export interface List{
  id? : number;
  title? : string | null;
  description? : string | null;
  taskCount? : number;
  user? : User;
  tasks? : Array<any>;//any to be changed to list
}
