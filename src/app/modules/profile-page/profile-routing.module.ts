import { FavoriteArticlesComponent } from './favorite-articles/favorite-articles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { ListArticlesComponent } from './list-articles/list-articles.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: ':username',
    component: ProfilePageComponent,
    children: [
      { path: 'favorites', component: FavoriteArticlesComponent },
      { path: '', component: ListArticlesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
