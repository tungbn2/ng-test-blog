import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css'],
})
export class CommentDetailComponent implements OnInit {
  @Input() comment!: ArticlesModel.Comment;
  @Input() isUser: boolean = false

  constructor() {}

  ngOnInit(): void {}
}
