import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { ConnectApiService } from 'src/app/services/connect-api/connect-api.service';
import { UpdateArticle } from 'src/app/models/Articles.model';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css'],
})
export class EditorPageComponent implements OnInit {

  formArt!: FormGroup;
  articles!: UpdateArticle;
  tags: string[] = [];
  slugA: string = '';
  loadedData: boolean = false;
  wait: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private articleService: ConnectApiService,
  ) {
    this.formArt = this.formBuilder.group({
      title: this.formBuilder.control('',Validators.required),
      description: this.formBuilder.control('',Validators.required),
      body: this.formBuilder.control('',Validators.required),
      tagForm: ''
    })
  }

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params => {

      this.slugA = params.get('slug') as string;
      this.articleService.GetArticleBySlug(this.slugA).subscribe(res => {
        this.loadedData = true;
        if (this.slugA) {
          this.iF.title.patchValue(res.article.title);
          this.iF.description.patchValue(res.article.description);
          this.iF.body.patchValue(res.article.body);
          this.tags = res.article.tagList
        }
      })
    })
  }
  get iF() {
    return this.formArt.controls;
  }
  onSubmit() {
    Swal.fire({
      title: this.slugA
        ? 'Do you want to update this article?'
        : 'Do you want to create new article?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.wait = true;
        this.articles = {
          article: {
            title: this.iF.title.value,
            description: this.iF.description.value,
            body: this.iF.body.value,
            tagList: this.tags
          }
        }
        if (this.slugA) {
          this.articleService.PutUpdateArticle(this.articles, this.slugA).subscribe(res => {
            this.router.navigateByUrl('/article/' + res.article.slug)
          })
        } else {
            this.articleService.PostCreateArticle(this.articles).subscribe(res => {
            this.router.navigateByUrl('/article/' + res.article.slug)
          })
        }
      }
    })

  }

  onAddTag() {
    if (this.iF.tagForm.value) {
      if (this.tags.indexOf(this.iF.tagForm.value) < 0) {
        this.tags.push(this.iF.tagForm.value)
      }
    }
    this.iF.tagForm.setValue('')
  }

  removeTag(tagName: string) {
    this.tags = this.tags.filter(tag =>
      tag !== tagName
    )
  }
}
