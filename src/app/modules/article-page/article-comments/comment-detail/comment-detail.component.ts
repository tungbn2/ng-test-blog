import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ArticlesModel } from 'src/app/models';
import { CommentStoreService } from 'src/app/services/store/comment-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css'],
})
export class CommentDetailComponent implements OnInit {
  @Input() comment!: ArticlesModel.Comment;
  @Input() isUser: boolean = false;

  get currentUser() {
    let currUser = JSON.parse(localStorage.getItem('userBlogData') || '');
    return currUser;
  }

  slug: string = '';

  constructor(
    private commentStore: CommentStoreService,
    private route: ActivatedRoute
  ) {
    this.slug = this.route.snapshot.params['slug'];
  }

  ngOnInit(): void {}

  onDeleteComment() {
    // this.commentStore.DeleteComment(this.slug, this.comment.id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this comment!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.commentStore.DeleteComment(this.slug, this.comment.id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }
}
