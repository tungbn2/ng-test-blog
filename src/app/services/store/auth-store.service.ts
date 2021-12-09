import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from 'src/app/models';
import {
  loginData,
  NewUser,
  UpdateUser,
  User,
} from 'src/app/models/User.model';
import { HandleError } from '../connect-api/api-data';
import { ConnectApiService } from '../connect-api/connect-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private userData: User | undefined;
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private api: ConnectApiService, private router: Router) {}

  Login(EmailAndPass: UserModel.EmailAndPass) {
    let loginData: UserModel.loginData = { user: EmailAndPass };
    this.api.Login(loginData).subscribe(
      (AuthUser) => {
        this.userData = AuthUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(AuthUser.user));
        alert('Login success!');
        this.router.navigate(['/']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  autoLogin() {
    if (localStorage.getItem('userBlogData')) {
      const user = JSON.parse(localStorage.getItem('userBlogData') || '');
      this.userData = user;
      this.currentUser.next(user);
    } else {
      this.currentUser.next(null);
    }
    return;
  }

  autoLogout() {}

  Logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('userBlogData');
    this.currentUser.next(null);
    alert('logout success!');
  }

  Registration(RegisterData: UserModel.RegisterData) {
    let newUser: NewUser = { user: RegisterData };
    this.api.Registration(newUser).subscribe(
      (newUser) => {
        this.userData = newUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(newUser.user));
        alert('Register success!');
        this.router.navigate(['/']);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  GetCurrentUser() {
    this.api.GetCurrentUser().subscribe(
      (authUser) => {
        this.userData = authUser.user;
        this.currentUser.next({ ...this.userData });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  UpdateUser(updateUserData: UserModel.UpdateUserData) {
    let updateUser: UserModel.UpdateUser = { user: updateUserData };
    this.api.PutUpdateUser(updateUser).subscribe(
      (AuthUser) => {
        this.userData = AuthUser.user;
        this.currentUser.next({ ...this.userData });
        localStorage.setItem('userBlogData', JSON.stringify(AuthUser.user));
        alert('Update success!');
        this.router.navigate(['/']);
      },
      (err) => console.log(err)
    );
  }
}
