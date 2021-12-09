import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './settings-page.component';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [CoreModule, SettingsRoutingModule],
})
export class SettingsPageModule {}
