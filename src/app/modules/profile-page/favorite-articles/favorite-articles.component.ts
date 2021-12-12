import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  articlesList: ArticlesModel.MultiArticles | undefined;
  username: string = '';
  isLoaded: boolean = false;

  currentPage: number = 1;
  pageList: number[] = [];

  route$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route$ = this.route.parent?.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({ favorited: this.username });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          this.articlesList = articlesListData;
          this.isLoaded = true;

          this.pageList = [];
          let total = Math.ceil(articlesListData.articlesCount / 20);
          for (let i = 1; i <= total; i++) {
            this.pageList.push(i);
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.route$ ? this.route$.unsubscribe() : '';
  }

  onNextPage() {
    this.currentPage++;
    this.articleStore.GetListArticles({
      favorited: this.username,
      offset: (this.currentPage - 1) * 20,
    });
  }

  onPrevPage() {
    this.currentPage--;
    this.articleStore.GetListArticles({
      favorited: this.username,
      offset: (this.currentPage - 1) * 20,
    });
  }

  onGotoPage(item: number) {
    if (this.currentPage != item) {
      this.currentPage = item;
      this.articleStore.GetListArticles({
        favorited: this.username,
        offset: (this.currentPage - 1) * 20,
      });
    }
  }
}
