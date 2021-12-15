import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-pagiantor',
  templateUrl: './pagiantor.component.html',
  styleUrls: ['./pagiantor.component.css'],
})
export class PagiantorComponent implements OnInit {
  @Input() totalArticle!: number;
  @Output() changePage = new EventEmitter<number>();
  @Input() currentPage: number = 1;

  get currentArticles() {
    let article: number;
    if (this.currentPage * 9 <= this.totalArticle) {
      article = this.currentPage * 9;
    } else {
      article = this.totalArticle ? this.totalArticle : 10;
    }
    return article;
  }

  constructor(private articleStore: ArticleStoreService) {}

  ngOnInit(): void {}

  onNextPage() {
    this.currentPage++;
    this.changePage.emit(this.currentPage);
  }

  onPrevPage() {
    this.currentPage--;
    this.changePage.emit(this.currentPage);
  }

  onGotoPage(page: number) {
    if (this.currentPage != page) {
      this.currentPage = page;
      this.articleStore.GetListArticles({
        offset: (this.currentPage - 1) * 20,
      });
    }
    this.changePage.emit(this.currentPage);
  }
}
