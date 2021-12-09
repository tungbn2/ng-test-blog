import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  settingForm = new FormGroup({
    image: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    bio: new FormControl(''),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthStoreService) {}

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

  onSubmit() {
    this.auth.UpdateUser(this.settingForm.value);
  }
}
