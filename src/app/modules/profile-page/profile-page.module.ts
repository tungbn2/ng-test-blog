import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfilePageComponent } from './profile-page.component';
import { CoreModule } from '../shared/core/core.module';
import { ListArticlesComponent } from './list-articles/list-articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FavoriteArticlesComponent } from './favorite-articles/favorite-articles.component';

@NgModule({
  declarations: [
    ProfilePageComponent,
    ListArticlesComponent,
    ArticleDetailComponent,
    FavoriteArticlesComponent,
  ],
  imports: [CoreModule, ProfileRoutingModule],
})
export class ProfilePageModule {}
