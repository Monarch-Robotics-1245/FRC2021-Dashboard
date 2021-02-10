import { Component, OnInit } from '@angular/core';
declare const NetworkTables: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor() { }

  incrementCamera(){
    let cameraIndex = NetworkTables.getValue("/Vision/camera_index",0);
    NetworkTables.setValue("/Vision/camera_index",(cameraIndex+1)%3)
  }

  ngOnInit(): void {
  }

}
