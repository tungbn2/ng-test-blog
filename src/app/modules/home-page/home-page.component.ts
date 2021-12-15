import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesModel, UserModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { TagsStoreService } from 'src/app/services/store/tags-store.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  articleList!: ArticlesModel.MultiArticles;
  totalArticles: number = 0;
  tagList: string[] = [];
  currentUser: UserModel.User | null = null;

  scrollTo: number = 0;
  status: 'feed' | 'global' | 'tag' = 'global';
  pageList: number[] = [];
  currentPage: number = 1;

  ArticlesList$: Subscription | undefined;
  tagList$: Subscription | undefined;
  user$: Subscription | undefined;

  isLoaded: boolean = false;

  constructor(
    private tagStore: TagsStoreService,
    private articleStore: ArticleStoreService,
    private authStore: AuthStoreService
  ) {}

  ngOnInit(): void {
    this.articleStore.GetListArticles({ limit: 9 });
    this.tagStore.GetTags();

    this.user$ = this.authStore.currentUser.subscribe((currentUserData) => {
      this.currentUser = currentUserData;
    });

    this.tagList$ = this.tagStore.TagsListData.subscribe((tagListData) => {
      this.tagList = tagListData;
    });

    this.ArticlesList$ = this.articleStore.ArticlesListUpdate.subscribe(
      (articlesData) => {
        this.isLoaded = true;
        this.articleList = articlesData;
      }
    );
  }

  ngAfterViewInit(): void {
    this.scrollTo = document.querySelector('#main-content')
      ?.scrollHeight as number;
  }

  ngOnDestroy() {
    this.tagList$ ? this.tagList$.unsubscribe() : '';
    this.ArticlesList$ ? this.ArticlesList$.unsubscribe() : '';
    this.user$ ? this.user$.unsubscribe : '';
  }

  onChangePage(page: number) {
    this.isLoaded = false;
    this.currentPage = page;

    this.articleStore.GetListArticles({
      offset: (this.currentPage - 1) * 9,
      limit: 9,
    });
  }

  onGotoFeed() {
    this.status = 'feed';
    this.isLoaded = false;
    this.articleStore.GetFeedArticles();
  }

  onGotoGlobal() {
    this.status = 'global';
    this.isLoaded = false;
    this.articleStore.GetListArticles({ limit: 9 });
  }

  onNavigateByTag(tag: string) {
    this.status = 'tag';
    this.isLoaded = false;
    this.articleStore.GetListArticles({ tag });

    document.body.scrollTo(0, this.scrollTo - 50);
  }
}
