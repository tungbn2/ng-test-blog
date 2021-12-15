
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreModule } from '../shared/core/core.module';
import { HomeArticlesComponent } from './home-articles/home-articles.component';

@NgModule({
  declarations: [HomePageComponent, HomeArticlesComponent, ],
  imports: [CoreModule, HomeRoutingModule],
})
export class HomePageModule {}
