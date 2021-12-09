
import { NgModule } from '@angular/core';


import { SettingsPageModule } from 'src/app/modules/settings-page/settings-page.module';
import { ArticlePageModule } from 'src/app/modules/article-page/article-page.module';
import { EditorPageModule } from 'src/app/modules/editor-page/editor-page.module';
import { ProfilePageModule } from 'src/app/modules/profile-page/profile-page.module';
import { CommonModule } from '@angular/common';
import { HomePageModule } from '../../home-page/home-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomePageModule,
    SettingsPageModule,
    ArticlePageModule,
    EditorPageModule,
    ProfilePageModule,
  ],
  exports: [
    HomePageModule,
    SettingsPageModule,
    ArticlePageModule,
    EditorPageModule,
    ProfilePageModule,
  ],
})
export class AllAppModule {}
