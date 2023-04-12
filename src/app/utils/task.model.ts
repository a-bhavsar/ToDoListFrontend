import { List } from "./list.model";

export interface Task{
  id? : number;
  title? : string | null;
  description? : string | null;
  startDate? : string | null;
  endDate? : string | null;
  status? : string;
  lists? : List[];
}
