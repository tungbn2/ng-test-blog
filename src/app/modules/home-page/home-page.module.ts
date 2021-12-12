
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../shared/core/core.module';
import { HomeArticlesComponent } from './home-articles/home-articles.component';
import { ArticleDetailComponent } from './home-articles/article-detail/article-detail.component';

@NgModule({
  declarations: [HomePageComponent, HomeArticlesComponent, ArticleDetailComponent],
  imports: [CoreModule, HomeRoutingModule],
})
export class HomePageModule {}
