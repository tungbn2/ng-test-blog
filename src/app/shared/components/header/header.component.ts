import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userData: UserModel.User | null = null;

  constructor(private auth: AuthStoreService) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((currentUser) => {
      this.userData = currentUser;
    });
  }

  onLogout() {
    this.auth.Logout();
  }
}
