import { ActivatedRoute } from '@angular/router';
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
    this.route$ = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            this.username = params['username'];
            this.articleStore.GetListArticles({ author: this.username });
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

  ngOnDestroy(): void {
    this.route$ ? this.route$.unsubscribe() : '';
  }

  onNextPage() {
    this.currentPage++;
    this.articleStore.GetListArticles({
      author: this.username,
      offset: (this.currentPage - 1) * 20,
    });
  }

  onGotoPage(item: number) {
    if (this.currentPage != item) {
      this.currentPage = item;
      this.articleStore.GetListArticles({
        author: this.username,
        offset: (this.currentPage - 1) * 20,
      });
    }
  }

  onPrevPage() {
    this.currentPage--;
    this.articleStore.GetListArticles({
      author: this.username,
      offset: (this.currentPage - 1) * 20,
    });
  }
}
