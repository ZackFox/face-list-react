export interface User {
  id: number;
  firstname: string;
  lastname: string;
  gender: 'мужчина' | 'женщина';
  city: string;
  age: number;
  email: string;
  resumes: number[];
}

export default interface Resume {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: 'мужчина' | 'женщина';
  city: string;
  position: string;
  photo: string;
  email: string;
  experience: ExpItem[];
  education: EduItem[];
  [key: string]: any;
}

export interface ExpItem {
  name: string;
  position: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  [key: string]: string;
}

export class EduItem {
  public name: string = '';
  public degree: string = '';
  public dateStart: string = '';
  public dateEnd: string = '';
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
  readonly list: Resume[];
  readonly loading: boolean;
  readonly errors?: string;
}
