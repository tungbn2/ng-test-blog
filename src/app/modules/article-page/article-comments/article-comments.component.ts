import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentStoreService } from './../../../services/store/comment-store.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ArticlesModel, UserModel } from 'src/app/models';
import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.css'],
})
export class ArticleCommentsComponent implements OnInit, OnDestroy {
  @Input() isUser: boolean = false;

  commentList: ArticlesModel.Comment[] = [];
  commentInput = new FormControl('', Validators.required);
  slug: string = '';
  isLoaded: boolean = false;
  currentUser: UserModel.User | null = null;

  route$: Subscription | undefined;
  user$: Subscription | undefined;

  constructor(
    private commentStore: CommentStoreService,
    private authStore: AuthStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user$ = this.authStore.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.route$ = this.route.params
      .pipe(
        switchMap((param) => {
          this.isLoaded = false;
          this.slug = param['slug'];
          this.commentStore.GetCommentsFromArticle(this.slug);
          return this.commentStore.CommentListData;
        }),
        tap((commentData) => {
          this.commentList = commentData;
          setTimeout(() => {
            this.isLoaded = true;
          }, 500);
        })
      )
      .subscribe();
  }

  changeSource(event: any) {
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }

  ngOnDestroy() {
    this.route$ ? this.route$.unsubscribe() : '';
    this.user$ ? this.user$.unsubscribe() : '';
  }

  onSubmitComment() {
    this.commentStore.AddCommentsToArticle(this.slug, this.commentInput.value);
    this.commentInput.setValue('');
  }
}
