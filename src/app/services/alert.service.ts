import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  config: any = {
    timeOut: 10000,
    // disableTimeOut: true,
    closeButton: true,
    positionClass: 'toast-top-center',
    iconClasses: 'toast-warning',
  };

  constructor() {
  }

  public errorToast(title: string, description: string = ''): void {
    this.toast('error', title, description);
  }

  private toast(icon: SweetAlertIcon = 'success',
                title: string = 'title',
                description: string = '',
                timer = 5000): void {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer,
      timerProgressBar: true,
      icon, title,
      text: description
    });
  }
}
