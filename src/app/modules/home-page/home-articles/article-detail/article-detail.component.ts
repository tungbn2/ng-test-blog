import { AuthStoreService } from 'src/app/services/store/auth-store.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesModel, UserModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article!: ArticlesModel.Article;
  @Output() gotoTag = new EventEmitter <string>()
  disabled: boolean = false;

  constructor(
    private articleStore: ArticleStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFavorite(slug: string, favorite: boolean) {
    let user = localStorage.getItem('userBlogData');
    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    if (favorite) {
      this.articleStore.UnfavoriteArticle(slug);
    } else {
      this.articleStore.FavoriteArticle(slug);
    }
  }

  onNavigate() {
    this.router.navigate(['/article', this.article.slug]);
  }

  onClick(item: string){
    this.gotoTag.emit(item)
  }
}
