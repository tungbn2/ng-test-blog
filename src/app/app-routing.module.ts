import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

import { LoginComponent } from './modules/auth-page/login/login.component';
import { RegisterComponent } from './modules/auth-page/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings-page/settings-page.module').then(
        (m) => m.SettingsPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./modules/editor-page/editor-page.module').then(
        (m) => m.EditorPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'article',
    loadChildren: () =>
      import('./modules/article-page/article-page.module').then(
        (m) => m.ArticlePageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile-page/profile-page.module').then(
        (m) => m.ProfilePageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
