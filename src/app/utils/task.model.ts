import { List } from "./list.model";

export interface Task{
  id? : number;
  title? : string;
  description? : string;
  start_date? : Date;
  end_date? : Date;
  status? : string;
  lists? : List[];
}
