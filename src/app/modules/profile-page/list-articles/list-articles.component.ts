import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { ArticlesModel } from 'src/app/models';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css'],
})
export class ListArticlesComponent implements OnInit {
  articlesList: ArticlesModel.MultiArticles | undefined;
  isLoaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['username']) {
            let username = params['username'];
            this.articleStore.GetListArticles({ author: username });
          }
          return this.articleStore.ArticlesListUpdate;
        }),
        tap((articlesListData) => {
          this.articlesList = articlesListData;
          this.isLoaded = true;
        })
      )
      .subscribe();
  }
}
