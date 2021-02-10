import { Component, OnInit } from '@angular/core';

declare const NetworkTables: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  rotation: number;

  constructor() {
    this.rotation = 90;
    NetworkTables.addKeyListener("/Position/r_path",(key,value) => {
      console.log(key, value);
      this.rotation = value;
      // do something with the values as they change
    }, true);
  }

  ngOnInit(): void {
  }

}
