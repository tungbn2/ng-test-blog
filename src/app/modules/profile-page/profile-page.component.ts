import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ProfileStoreService } from 'src/app/services/store/profile-store.service';
import { ProfileModel, UserModel } from 'src/app/models';
import { Subscription } from 'rxjs';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  profileData: ProfileModel.ProfileData | undefined;
  currentUser: UserModel.User | null = null;

  router$: Subscription | undefined;
  user$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private profileStore: ProfileStoreService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user$ = this.authStore.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
    this.router$ = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.profileStore.GetProfile(username);
          }
          return this.profileStore.ProfileUpdate;
        }),
        tap((profile) => {
          this.profileData = profile;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.router$ ? this.router$.unsubscribe() : '';
    this.user$ ? this.user$.unsubscribe() : '';
  }

  changeSource(event: any) {
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }

  onFollowUser() {
    let user = localStorage.getItem('userBlogData');

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.profileData?.following) {
      this.profileStore.UnfollowUser(this.profileData.username);
      return;
    }

    if (this.profileData) {
      this.profileStore.FollowUser(this.profileData.username);
      return;
    }
  }
}
