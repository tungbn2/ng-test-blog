import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import Swal from 'sweetalert2';

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

  changeSource(event: any) {
    event.target.src = 'https://api.realworld.io/images/smiley-cyrus.jpeg';
  }

  OnNavigate() {
    let slug = this.articleData ? this.articleData.currentArticle.slug : '';
    this.router.navigate(['/editor', slug]);
  }

  onDeleteArticle() {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this article!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let slug = this.articleData ? this.articleData.currentArticle.slug : '';
        this.article.DeleteArticle(slug);
      }
    })
  }

  onClickButtonFollow($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    setTimeout(() => {
      ($event.target as HTMLButtonElement).disabled = false;
    }, 1000);

    if (this.articleData?.author.following) {
      this.article.UnFollowUserFromArticle(this.articleData.author.username);
    } else {
      this.articleData
        ? this.article.FollowUserFromArticle(this.articleData.author.username)
        : '';
    }
  }

  onClickFavorite($event: MouseEvent) {
    ($event.target as HTMLButtonElement).disabled = true;
    setTimeout(() => {
      ($event.target as HTMLButtonElement).disabled = false;
    }, 1000);

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
