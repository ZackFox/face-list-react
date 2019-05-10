import { User } from "../user/types";

export default interface Resume {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  age: number;
  sex: "Мужчина" | "Женщина";
  city: string;
  position: string;
  photo: string;
  email: string;
  phone: string;
  experience: ExpItem[];
  education: EducationItem[];
  skills: string[];
  about: string;
  [key: string]: any;
}

export interface ExpItem {
  companyName: string;
  position: string;
  description: string;
  date_start: string;
  date_end: string;
  [key: string]: string;
}

export class EducationItem {
  public name: string = "";
  public degree: string = "";
  public date_start: string = "";
  public date_end: string = "";
  [key: string]: string;
}

export interface ResumeState {
  readonly current: Resume | null;
  readonly list: Resume[];
  readonly loading: boolean;
  readonly errors?: string;
}
