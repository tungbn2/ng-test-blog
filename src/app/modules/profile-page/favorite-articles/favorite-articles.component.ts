import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.css'],
})
export class FavoriteArticlesComponent implements OnInit, OnDestroy {
  articleList: ArticlesModel.MultiArticles | undefined;
  username: string = '';
  isLoaded: boolean = false;

  currentPage: number = 1;
  pageList: number[] = [];

  route$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route$ = this.route.parent?.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({
              favorited: this.username,
              limit: 9,
            });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          this.articleList = articlesListData;
          this.isLoaded = true;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.route$ ? this.route$.unsubscribe() : '';
  }

  onChangePage(page: number) {
    this.isLoaded = false;
    this.currentPage = page;

    this.articleStore.GetListArticles({
      favorited: this.username,
      offset: (this.currentPage - 1) * 9,
      limit: 9,
    });
  }

  gotoTag() {
    this.router.navigateByUrl('/');
  }
}
