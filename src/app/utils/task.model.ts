import { List } from "./list.model";

export interface Task{
  id? : number;
  title? : string | null;
  description? : string | null;
  start_date? : Date;
  end_date? : Date;
  status? : string;
  lists? : List[];
}
