import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProfileModel, UserModel, ArticlesModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';
import { switchMap, tap } from 'rxjs/operators';

export interface ProfileWithArticle {
  profile?: ProfileModel.ProfileData;
  articlesByAuthor: ArticlesModel.Article[];
  articlesFavorite: ArticlesModel.Article[];
}
@Injectable({
  providedIn: 'root',
})
export class ProfileStoreService {
  private profile: ProfileModel.ProfileData | null = null;
  private ProfileWithArticle: ProfileWithArticle = {
    articlesByAuthor: [],
    articlesFavorite: [],
  };

  ProfileUpdate = new Subject<ProfileModel.ProfileData>();
  ProfileWithArticleUpdate = new Subject<ProfileWithArticle>();

  constructor(private api: ConnectApiService) {}

  GetProfile(username: string) {
    this.api.GetProfile(username).subscribe((profileData) => {
      this.profile = profileData.profile;
      this.ProfileUpdate.next({ ...this.profile });
    });
  }

  GetFullProfile(username: string) {
    this.api
      .GetProfile(username)
      .pipe(
        switchMap((profile) => {
          this.profile = profile.profile;
          this.ProfileWithArticle = {
            profile: this.profile,
            articlesByAuthor: [],
            articlesFavorite: [],
          };
          let author = this.profile.username;
          return this.api.GetListArticles({ author });
        }),
        switchMap((articles) => {
          this.ProfileWithArticle.articlesByAuthor = articles.articles;
          let author = this.profile ? this.profile.username : '';
          return this.api.GetListArticles({ favorited: author });
        }),
        tap((articles) => {
          this.ProfileWithArticle.articlesFavorite = articles.articles;
          this.ProfileWithArticleUpdate.next({ ...this.ProfileWithArticle });
        })
      )
      .subscribe(
        () => {},
        (err) => console.log(err)
      );
  }

  FollowUser(username: string) {
    this.api.PostFollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileUpdate.next({ ...this.profile });
      },
      (err) => console.log(err)
    );
  }

  UnfollowUser(username: string) {
    this.api.DeleteUnfollowUser(username).subscribe(
      (profile) => {
        this.profile = profile.profile;
        this.ProfileUpdate.next({ ...this.profile });
      },
      (err) => console.log(err)
    );
  }
}
