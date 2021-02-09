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

  onRobotConnection(connected) {
    var state = connected ? 'Robot connected!' : 'Robot disconnected.';
    console.log(state);
  }

  constructor(){
    console.log(NetworkTables);
    NetworkTables.addRobotConnectionListener(this.onRobotConnection, false);
    ipc.send('connect', "localhost");
  }
}
