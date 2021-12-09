import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.css'],
})
export class ArticleHeaderComponent implements OnInit {
  @Input() articleData: ArticlesModel.CurrentArticleAndProfile | null = null;
  @Input() isUser: boolean = false;

  constructor(private router: Router, private article: ArticleStoreService) {}

  ngOnInit(): void {}

  OnNavigate() {
    let slug = this.articleData ? this.articleData.currentArticle.slug : '';
    this.router.navigate(['/editor', slug]);
  }

  onDeleteArticle() {
    let slug = this.articleData ? this.articleData.currentArticle.slug : '';
    this.article.DeleteArticle(slug);
  }

  onClickButtonFollow() {
    if (this.articleData?.author.following) {
      this.article.UnFollowUserFromArticle(this.articleData.author.username);
    } else {
      this.articleData
        ? this.article.FollowUserFromArticle(this.articleData.author.username)
        : '';
    }
  }

  onClickFavorite() {
    if (this.articleData?.currentArticle?.favorited) {
      this.article.UnfavoriteArticle(this.articleData.currentArticle.slug);
    }
    if (
      !this.articleData?.currentArticle?.favorited &&
      this.articleData?.currentArticle
    ) {
      this.article.FavoriteArticle(this.articleData.currentArticle.slug);
    }
  }
}
