import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { PagiantorComponent } from 'src/app/shared/components/pagiantor/pagiantor.component';
import { ArticleDetailComponent } from 'src/app/shared/components/article-detail/article-detail.component';

@NgModule({
  declarations: [LoadingComponent, PagiantorComponent, ArticleDetailComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoadingComponent,
    PagiantorComponent,
    ArticleDetailComponent,
  ],
})
export class CoreModule {}
