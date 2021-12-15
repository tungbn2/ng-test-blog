import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { ArticlesModel } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css'],
})
export class ListArticlesComponent implements OnInit, OnDestroy {
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
    this.route$ = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({
              author: this.username,
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

  ngOnDestroy(): void {
    this.route$ ? this.route$.unsubscribe() : '';
  }
  onChangePage(page: number) {
    this.isLoaded = false;
    this.currentPage = page;

    this.articleStore.GetListArticles({
      author: this.username,
      offset: (this.currentPage - 1) * 9,
      limit: 9,
    });
  }

  gotoTag() {
    this.router.navigateByUrl('/');
  }
}
