import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { UserModel } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthStoreService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    let registerData: UserModel.RegisterData = {
      email: form.value.email,
      password: form.value.password,
      username: form.value.username,
    };

    this.auth.Registration(registerData);
  }
}
