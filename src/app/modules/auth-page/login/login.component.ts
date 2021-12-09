import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthStoreService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.auth.Login(form.value)
  }
}
