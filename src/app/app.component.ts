import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from './services/store/auth-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthStoreService) {}

  ngOnInit() {
    this.auth.autoLogin();
  }
}
