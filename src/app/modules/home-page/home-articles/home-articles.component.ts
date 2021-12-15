import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';

@Component({
  selector: 'app-home-articles',
  templateUrl: './home-articles.component.html',
  styleUrls: ['./home-articles.component.css'],
})
export class HomeArticlesComponent implements OnInit {
  @Input() articleList!: ArticlesModel.MultiArticles;
  @Output() gotoTag = new EventEmitter<string>();

  ngOnInit(): void {}

  OnGotoTag(item: string) {
    this.gotoTag.emit(item);
  }
}
