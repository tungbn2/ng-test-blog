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
  isLoaded: boolean = false;

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
            let username = params['username'];
            this.articleStore.GetListArticles({ favorited: username });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          console.log(articlesListData);

          this.articlesList = articlesListData;
          this.isLoaded = true;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.route$ ? this.route$.unsubscribe() : '';
  }
}
