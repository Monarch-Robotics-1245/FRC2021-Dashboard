import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare const NetworkTables: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{
  @ViewChild("field") field: ElementRef;

  rotation: number;
  x: number;
  y: number;
  minX = -1.0;
  maxX = 9;
  minY = -3;
  maxY = 3;
  fieldHeight = 10;
  fieldWidth = 10;

  constructor() {
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
    this.fieldHeight = 10;
    this.fieldWidth = 10;
    setInterval( () => {
      this.updateField();
    },50)
    NetworkTables.addKeyListener("/Position/r_path",(key,value) => {
      console.log(key, value);
      this.rotation = value;
    }, true);
    NetworkTables.addKeyListener("/Position/x_path",(key,value) => {
      console.log(key, value);
      this.x = value;
    }, true);
    NetworkTables.addKeyListener("/Position/y_path",(key,value) => {
      console.log(key, value);
      this.y = value;
    }, true);
  }

  updateField(){
    if(this.field==null){
      return;
    }
    this.fieldWidth = this.field.nativeElement.offsetWidth;
    this.fieldHeight = this.field.nativeElement.offsetHeight;
  }

  getStyle(){
    let xRange = this.maxX - this.minX;
    let yRange = this.maxY - this.minY;
    let x = (this.x - this.minX)/xRange * this.fieldWidth - 75;
    let y = (1 -(this.y - this.minY)/yRange) * this.fieldHeight - 92.1;
    return 'top: '+y.toString()+'px; '
      +'left:'+x.toString()+'px;'
      +'transform: rotate('+(this.rotation - 90).toString()+"deg);";
  }

}
