import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/shared/core/core.module';
import { AllAppModule } from './modules/shared/app/all-app.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './modules/auth-page/login/login.component';
import { RegisterComponent } from './modules/auth-page/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, AllAppModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
