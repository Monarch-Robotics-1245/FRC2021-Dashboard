import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { DrivetrainComponent } from './drivetrain/drivetrain.component';
import {FormsModule} from "@angular/forms";
import { CompassComponent } from './compass/compass.component';
import { PdpComponent } from './pdp/pdp.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    DrivetrainComponent,
    CompassComponent,
    PdpComponent
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
