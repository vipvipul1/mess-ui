import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  tOptions: IndividualConfig

  constructor(
    private toastr: ToastrService
  ) {
    this.tOptions = this.toastr.toastrConfig;
    this.tOptions.progressBar = true;
    this.tOptions.progressAnimation = 'increasing';
    this.tOptions.timeOut = 3000;
  }

  showSuccess(message, title) {
    this.toastr.success(message, title);
  }

  showError(message, title) {
    this.toastr.error(message, title)
  }

  showInfo(message, title) {
    this.toastr.info(message, title)
  }

  showWarning(message, title) {
    this.toastr.warning(message, title)
  }

}
