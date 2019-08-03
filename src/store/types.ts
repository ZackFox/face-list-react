export interface User {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  email: string;
  resumes: number[];
}

export default interface Resume {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  age: number;
  photo: string;
  gender: string;
  city: string;
  email: string;
  phone: string;
  position: string;
  salary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  about: string;
  [key: string]: any;
}

export class ExperienceItem {
  name: string = "";
  position: string = "";
  description: string = "";
  dateStart: string = "";
  dateEnd: string = "";
  [key: string]: string;
}

export class EducationItem {
  name: string = "";
  speciality: string = "";
  dateStart: string = "";
  dateEnd: string = "";
  [key: string]: string;
}

export interface UserState {
  readonly data: User | null;
  readonly isLogined: boolean;
  readonly loading: boolean;
  readonly message: string;
}

export interface ResumeState {
  readonly current: Resume | null;
  readonly list: { data: Resume[]; meta: { pages: number } };
  readonly loading: boolean;
  readonly errors?: string;
}
