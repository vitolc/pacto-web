import {Component, Input, OnInit} from '@angular/core';
import {JobApplicationsService} from "../../services/job-applications.service";
import {UserService} from "../../services/user.service";
import {FormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-apply-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './apply-modal.component.html',
  styleUrl: './apply-modal.component.css'
})
export class ApplyModalComponent implements OnInit {
  public vacancyId!: number;
  application: any = {};

  constructor(
    public _activeModal: NgbActiveModal,
    private _jobApplicationsService: JobApplicationsService,
    private _userService: UserService
  ) {

  }
  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this._userService.getUserInfo().subscribe({
      next: user => {
        console.log('Dados do usuário:', user);
        this.application.name = user.data.name;
        this.application.email = user.data.email;
        this.application.phone = user.data.phone;
      },
      error: error => {
        console.error('Erro ao carregar informações do usuário', error);
      }
    })
  }

  onSubmit(): void {
    this._jobApplicationsService.apply(this.application,  this.vacancyId).subscribe(
      response => {
        console.log('Candidatura enviada com sucesso!', response);
        this.closeModal();
      },
      error => {
        console.error('Erro ao enviar a candidatura', error);
      }
    );
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

  closeModal() {
    this._activeModal.close();
  }
}
