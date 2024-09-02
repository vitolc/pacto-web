import {Component, Input, OnInit} from '@angular/core';
import {JobApplicationsService} from "../../../services/job-applications.service";
import {UserService} from "../../../services/user.service";
import {FormsModule} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Strings} from "../../../common/function.common";
import isObjectEmpty = Strings.isObjectEmpty;

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
    const user = this._userService.userInfo;
    if (isObjectEmpty(user)) {
      return;
    }
    this.application.name = user!.name;
    this.application.email = user!.email;
    this.application.phone = user!.phone;
  }

  public onSubmit(): void {
    this._jobApplicationsService.apply(this.application, this.vacancyId).subscribe({
      next: (response) => {
        this.closeModal();
      },
      error: (error) => {
        console.error('Erro ao enviar a candidatura', error);
      },
    });
  }

  dismissModal() {
    this._activeModal.dismiss();
  }

  closeModal() {
    this._activeModal.close();
  }

  restrictToNumbers(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }
}
