import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleStoreService } from 'src/app/services/store/article-store.service';
import { switchMap, tap } from 'rxjs/operators';
import { ArticlesModel } from 'src/app/models';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css'],
})
export class EditorPageComponent implements OnInit, OnDestroy {
  formEditArticle = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    tagList: new FormArray([]),
  });

  loadedData: boolean = false;
  tagListData: string[] = [];
  wait: boolean = false;

  slug: string = '';

  router$: Subscription | undefined;

  get tagList() {
    return this.formEditArticle.controls.tagList as FormArray;
  }

  constructor(
    private route: ActivatedRoute,
    private articleStore: ArticleStoreService
  ) {}

  ngOnInit(): void {
    this.router$ = this.route.params
      .pipe(
        switchMap((params) => {
          if (params['slug']) {
            this.slug = params['slug'];
            this.articleStore.GetArticle(this.slug);
          } else this.loadedData = true;
          return this.articleStore.CurrentArticleUpdate;
        }),
        tap((currentArticle) => {
          if (currentArticle) {
            this.loadedData = true;
          }

          let editArticleData = {
            title: currentArticle.title,
            description: currentArticle.description,
            body: currentArticle.body,
          };

          this.formEditArticle.patchValue(editArticleData);

          this.tagListData = currentArticle.tagList.slice();
          currentArticle.tagList.forEach((tagItem) => {
            this.addTag(tagItem);
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.router$ ? this.router$.unsubscribe() : '';
  }

  addTag(tagName: string) {
    this.tagList.controls.push(new FormControl(tagName));
  }

  onRemoveTagItem(index: number) {
    this.tagListData.splice(index, 1);
    this.tagList.removeAt(index);
  }

  onSubmit(tagList: string) {
    Swal.fire({
      title: this.slug
        ? 'Do you want to update this article?'
        : 'Do you want to create new article?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.wait = true;
        tagList.split(',').forEach((tagName) => {
          if (tagName) this.addTag(tagName);
        });

        let tagListValue = this.tagList.controls.map((item) => item.value);

        let articleData: ArticlesModel.ArticleData = {
          ...this.formEditArticle.value,
          tagList: tagListValue,
        };

        if (this.slug) {
          this.articleStore.UpdateArticle(articleData, this.slug);
        } else {
          this.articleStore.CreateArticle(articleData);
        }
      }
    });
  }
}
