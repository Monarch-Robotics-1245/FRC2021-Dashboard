import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { DrivetrainComponent } from './drivetrain/drivetrain.component';
import {FormsModule} from "@angular/forms";
import { CompassComponent } from './compass/compass.component';


@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    DrivetrainComponent,
    CompassComponent
  ],
  imports: [
      BrowserModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
