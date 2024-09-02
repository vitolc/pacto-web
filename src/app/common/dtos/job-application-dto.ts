import {UserDto} from "./user-dto";
import {JobVacancyDto} from "./job-vacancy-dto";

export interface JobApplicationDto {
  user: UserDto
  vacancy: JobVacancyDto
  coverLetter: string,
  phone: string,
  email: string,
}
