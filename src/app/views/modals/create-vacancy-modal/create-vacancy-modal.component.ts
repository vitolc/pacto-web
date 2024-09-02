import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {JobApplicationsService} from "../../../services/job-applications.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-vacancy-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-vacancy-modal.component.html',
  styleUrl: './create-vacancy-modal.component.css'
})
export class CreateVacancyModalComponent {
  vacancy = {
    title: '',
    description: ''
  };

  constructor(
    public activeModal: NgbActiveModal,
    private jobApplicationsService: JobApplicationsService
  ) {}

  public onSubmit(): void {
    this.jobApplicationsService.createVacancy(this.vacancy).subscribe({
      next: (response) => {
        console.log('Vaga criada com sucesso!', response);
        this.activeModal.close();
      },
      error: (error) => {
        console.error('Erro ao criar vaga', error);
      },
    });
  }

  dismissModal(): void {
    this.activeModal.dismiss();
  }

}
