import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel, UserModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  articleData: ArticlesModel.CurrentArticleAndProfile | null = null;
  currentUser: UserModel.User | null = null;
  slug: string = '';
  isLoaded = false;

  user$: Subscription | undefined;
  article$: Subscription | undefined;

  constructor(
    private auth: AuthStoreService,
    private article: ArticleStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.auth.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.article$ = this.route.params.subscribe((data) => {
      this.isLoaded = false;
      this.slug = data['slug'];
      this.article.GetArticleAndProfile(this.slug);
      this.article.CurrentArticleAndProfileUpdate.subscribe(
        (articleAndProfile) => {
          this.isLoaded = true;
          this.articleData = articleAndProfile;
        }
      );
    });
  }

  ngOnDestroy() {
    this.user$ ? this.user$.unsubscribe() : '';
    this.article$ ? this.article$.unsubscribe() : '';
  }
}
