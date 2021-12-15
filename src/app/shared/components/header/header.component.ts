import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userData: UserModel.User | null = null;
  scroll: boolean = false;
  statusCanvas: boolean = false;

  constructor(private auth: AuthStoreService) {}

  ngOnInit(): void {
    this.auth.currentUser.subscribe((currentUser) => {
      this.userData = currentUser;
    });

    window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      this.scroll = true;
    } else {
      this.scroll = false;
    }
  };

  changeSource(event: any) {
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
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

  onClick() {
    document.querySelector('#offcanvasRight')?.classList.remove('show');
  }
}
