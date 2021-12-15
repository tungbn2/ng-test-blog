import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  settingForm = new FormGroup({
    image: new FormControl(
      '',
      [],
      this.validateUserNameFromAPIDebounce.bind(this)
    ),
    username: new FormControl('', Validators.required),
    bio: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isImageValid: boolean = true;

  constructor(private auth: AuthStoreService, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((userData) => {
      this.settingForm.patchValue({
        image: userData?.image,
        username: userData?.username,
        bio: userData?.bio,
        email: userData?.email,
      });
    });
  }

  onErrorImage(event: any) {
    this.isImageValid = false;
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }

  onChangeImageUrl() {
    console.log(this.settingForm.get('image'));
  }

  onSubmit() {
    Swal.fire({
      title: 'Do you want to change your settings?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let updateUser: any = {};
        Object.entries(this.settingForm.value).forEach(([key, value]) => {
          let valueData = value ? (value as string) : '';

          if (valueData.trim() != '' && key != 'email' && key != 'password') {
            updateUser[key] = valueData;
          }
        });

        this.auth.UpdateUser(updateUser);
      }
    });
  }

  onLogout() {
    Swal.fire({
      title: 'Do you want to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, do it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.Logout();
      }
    });
  }

  validateUserNameFromAPIDebounce(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return fetch(control.value)
      .then((ok) => null)
      .catch((err) => {
        return { isInvalid: true };
      });
  }
}
