export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  resumes: number[];
}

export default interface Resume {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  age: number;
  photo: string | null;
  gender: string;
  city: string;
  email: string;
  phone: string;
  position: string;
  salary: number;
  experience: ExperienceItem[];
  education: EducationItem[];
  about: string;
}

export class ExperienceItem {
  id: number = 0;
  name: string = "";
  position: string = "";
  description: string = "";
  dateStart: string = "";
  dateEnd: string = "";
}

export class EducationItem {
  id: number = 0;
  name: string = "";
  speciality: string = "";
  dateStart: string = "";
  dateEnd: string = "";
}

export interface UserState {
  readonly data: User | null;
  readonly isLoggedIn: boolean;
  readonly loading: boolean;
  readonly message: string;
}

export interface ResumeListState {
  readonly data: Resume[];
  readonly meta: { pages: number };
  readonly loading: boolean;
}

export interface CurrentResumeState {
  readonly data: Resume | null;
  readonly loading: boolean;
}

export interface CitiesState {
  readonly data: string[];
  readonly loading: boolean;
  readonly error: Error | null;
}
