import { Component } from '@angular/core';
declare var NetworkTables: any;
declare var ipc: any;
// import * as networkTables from '../../networktables.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blank-app';
  rotation: number;

  onRobotConnection(connected) {
    var state = connected ? 'Robot connected!' : 'Robot disconnected.';
    console.log(state);
  }

  // newListener(key,value){
  //   console.log(key);
  //   console.log(value);
  //   this.rotation = value;
  // }

  constructor(){
    this.rotation = 90;
    console.log(NetworkTables);
    NetworkTables.addRobotConnectionListener(this.onRobotConnection, false);
    ipc.send('connect', "roborio-1245-frc.local");
  }
}
