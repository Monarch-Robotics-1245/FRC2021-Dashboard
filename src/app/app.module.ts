import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import {FormsModule} from "@angular/forms";
import { MapComponent } from './map/map.component';
import { MisctablesComponent } from './misctables/misctables.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    MapComponent,
    MisctablesComponent,
  ],
  imports: [
      BrowserModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
