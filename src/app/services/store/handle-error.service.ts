import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor(private router: Router) {}

  HandleError(err: HttpErrorResponse) {
    switch (err.status) {
      case 422:
        let msg: string = Object.entries(err.error.errors).reduce(
          (mess, [key, value]) => {
            let valueMsg = (value as any)[0];
            return `${mess}, ${key} ${valueMsg}`;
          },
          ''
        );

        Swal.fire(msg, 'You clicked the button!', 'error');
        break;

      case 401:
        Swal.fire(
          'You do not have permission to do!!!',
          'You clicked the button!',
          'error'
        );
        break;

      case 403:
        Swal.fire(
          'You do not have permission to do!!!',
          'You clicked the button!',
          'error'
        );
        break;

      case 500:
        Swal.fire(err.error, 'You clicked the button!', 'error');
        break;

      default:
        this.router.navigateByUrl('/fail-connect');
        break;
    }
  }
}
