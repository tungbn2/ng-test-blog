import { Profile } from './../../models/Profile.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ArticlesModel, OtherModel, ProfileModel } from 'src/app/models';
import { ConnectApiService } from '../connect-api/connect-api.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArticleStoreService {
  private ArticlesList: ArticlesModel.MultiArticles = {
    articles: [],
    articlesCount: 0,
  };
  private CurrentArticle: ArticlesModel.Article | null = null;
  private CurrentArticleAndProfile: ArticlesModel.CurrentArticleAndProfile | null =
    null;

  ArticlesListUpdate = new Subject<ArticlesModel.MultiArticles>();
  CurrentArticleUpdate = new Subject<ArticlesModel.Article>();
  CurrentArticleAndProfileUpdate =
    new Subject<ArticlesModel.CurrentArticleAndProfile>();

  constructor(private api: ConnectApiService, private router: Router) {}

  GetListArticles(params: OtherModel.getArticleParam) {
    this.api.GetListArticles(params).subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  GetFeedArticles() {
    this.api.GetFeedArticles().subscribe(
      (articlesData) => {
        this.ArticlesList = articlesData;
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  GetArticle(slug: string) {
    this.api.GetArticleBySlug(slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
      },
      (err) => console.log(err)
    );
  }

  GetArticleAndProfile(slug: string) {
    this.api
      .GetArticleBySlug(slug)
      .pipe(
        switchMap((articleData) => {
          this.CurrentArticle = articleData.article;
          let username: string = articleData.article.author.username;
          return this.api.GetProfile(username);
        }),
        tap((author) => {
          this.CurrentArticle
            ? (this.CurrentArticleAndProfile = {
                author: author.profile,
                currentArticle: this.CurrentArticle,
              })
            : '';
          this.CurrentArticleAndProfile
            ? this.CurrentArticleAndProfileUpdate.next({
                ...this.CurrentArticleAndProfile,
              })
            : '';
        })
      )
      .subscribe();
  }

  CreateArticle(newArticleData: ArticlesModel.ArticleData) {
    let newArticle: ArticlesModel.NewArticle = { article: newArticleData };
    this.api.PostCreateArticle(newArticle).subscribe(
      (articleData) => {
        this.ArticlesList.articles.unshift(articleData.article);
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
        alert('Create Article Successfully!');
      },
      (err) => console.log(err)
    );
  }

  UpdateArticle(updateArticleData: ArticlesModel.ArticleData, slug: string) {
    let updateArticle: ArticlesModel.UpdateArticle = {
      article: updateArticleData,
    };
    this.api.PutUpdateArticle(updateArticle, slug).subscribe(
      (articleData) => {
        this.CurrentArticle = articleData.article;
        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        alert('Update Article Successfully!');
      },
      (err) => console.log(err)
    );
  }

  DeleteArticle(slug: string) {
    this.api.DeleteArticle(slug).subscribe(
      () => {
        alert('Delete article successfully!!!');
        this.router.navigateByUrl('/');
      },
      (err) => console.log(err)
    );
  }

  FavoriteArticle(slug: string) {
    this.api.PostFavoriteArticle(slug).subscribe(
      (favoriteArticle) => {
        this.CurrentArticle = favoriteArticle.article;
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == favoriteArticle.article.slug) {
            item.favorited = favoriteArticle.article.favorited;
            item.favoritesCount = favoriteArticle.article.favoritesCount;
          }
        });

        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        if (this.CurrentArticleAndProfile)
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
            currentArticle: this.CurrentArticle,
          });
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  UnfavoriteArticle(slug: string) {
    this.api.DeleteUnfavoriteArticle(slug).subscribe(
      (unfavoriteArticle) => {
        this.CurrentArticle = unfavoriteArticle.article;
        this.ArticlesList.articles.forEach((item) => {
          if (item.slug == unfavoriteArticle.article.slug) {
            item.favorited = unfavoriteArticle.article.favorited;
            item.favoritesCount = unfavoriteArticle.article.favoritesCount;
          }
        });

        this.CurrentArticleUpdate.next({ ...this.CurrentArticle });
        if (this.CurrentArticleAndProfile)
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
            currentArticle: this.CurrentArticle,
          });
        this.ArticlesListUpdate.next({ ...this.ArticlesList });
      },
      (err) => console.log(err)
    );
  }

  FollowUserFromArticle(username: string) {
    this.api.PostFollowUser(username).subscribe(
      (profile) => {
        if (this.CurrentArticleAndProfile) {
          this.CurrentArticleAndProfile.author = profile.profile;
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
          });
        }
      },
      (err) => console.log(err)
    );
  }

  UnFollowUserFromArticle(username: string) {
    this.api.DeleteUnfollowUser(username).subscribe(
      (profile) => {
        if (this.CurrentArticleAndProfile) {
          this.CurrentArticleAndProfile.author = profile.profile;
          this.CurrentArticleAndProfileUpdate.next({
            ...this.CurrentArticleAndProfile,
          });
        }
      },
      (err) => console.log(err)
    );
  }
}
