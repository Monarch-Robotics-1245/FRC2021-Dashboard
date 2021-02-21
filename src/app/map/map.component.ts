import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare const NetworkTables: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent{
  @ViewChild("field") field: ElementRef;
  @ViewChild("bot") bot: ElementRef;

  rotation: number;
  x: number;
  y: number;
  minX = -1.0;
  maxX = 9;
  minY = -3;
  maxY = 3;

  fieldHeight: number;
  fieldWidth: number;
  botHeight: number;
  botWidth: number;

  usingIntake: boolean;

  barrelField: Field = {
    xOffset: 1.0,
    yOffset: 0.0,
    points: [
      this.pointFromCoord("D5"), this.pointFromCoord("D10"), this.pointFromCoord("B8"),
    ],
    boxes: [
      {p1: this.pointFromCoord("B0"), p2: this.pointFromCoord("D2")}
    ]
  };
  slalomField: Field = {
    xOffset: 0.8,
    yOffset: -60 * 0.0254,
    boxes: [
      {p1: this.pointFromCoord("B0"), p2: this.pointFromCoord("D2"), color: "#ba000d"},
      {p1: this.pointFromCoord("D0"), p2: this.pointFromCoord("F2"), color: "#08af23"}
    ],
    points: [
      this.pointFromCoord("D4"),
      this.pointFromCoord("D5"),
      this.pointFromCoord("D6"),
      this.pointFromCoord("D7"),
      this.pointFromCoord("D8"),
      this.pointFromCoord("D10"),
    ]
  }
  bounceField: Field = {
    xOffset: 1.0,
    yOffset: 0.0,
    boxes: [
      {p1: this.pointFromCoord("B0"), p2: this.pointFromCoord("D2"), color: "#08af23"},
      {p1: this.pointFromCoord("B10"), p2: this.pointFromCoord("D12"), color: "#ba000d"},
    ],
    points: [
      this.pointFromCoord("D3"), this.pointFromCoord("E3"), this.pointFromCoord("B4"),
      this.pointFromCoord("B5"), this.pointFromCoord("D5"), this.pointFromCoord("B7"),
      this.pointFromCoord("B8"), this.pointFromCoord("D7"), this.pointFromCoord("D8"),
      this.pointFromCoord("A3", "#00ff00"), this.pointFromCoord("A6", "#00ff00"), this.pointFromCoord("A9", "#00ff00"),
    ]
  };
  galacticAField: Field = {
    xOffset: 0.4,
    yOffset: 0.0,
    boxes: [
      {p1: this.pointFromCoord("@0"), p2: this.pointFromCoord("F1"), color: "#08af23"},
      {p1: this.pointFromCoord("@11"), p2: this.pointFromCoord("F12"), color: "#ba000d"},
    ],
    points: [
      this.pointFromCoord("C3", "#ff0000"), this.pointFromCoord("D5", "#ff0000"), this.pointFromCoord("A6", "#ff0000"),
      this.pointFromCoord("E6", "#03a9f4"), this.pointFromCoord("B7", "#03a9f4"), this.pointFromCoord("C9", "#03a9f4"),
    ]
  };
  galacticBField: Field = {
    xOffset: 0.4,
    yOffset: 0.0,
    boxes: [
      {p1: this.pointFromCoord("@0"), p2: this.pointFromCoord("F1"), color: "#08af23"},
      {p1: this.pointFromCoord("@11"), p2: this.pointFromCoord("F12"), color: "#ba000d"},
    ],
    points: [
      this.pointFromCoord("B3", "#ff0000"), this.pointFromCoord("D5", "#ff0000"), this.pointFromCoord("B7", "#ff0000"),
      this.pointFromCoord("D6", "#03a9f4"), this.pointFromCoord("B8", "#03a9f4"), this.pointFromCoord("D10", "#03a9f4"),
    ]
  };
  emtpyField: Field = {
    yOffset: 0,
    xOffset: 0,
    boxes: [],
    points: [],
  }

  currentField: Field;

  pathPoints: PathPoint[] = [];
  uploadedFile: File = null;
  pathIndex = 0;

  constructor() {
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
    this.usingIntake = false;
    this.fieldHeight = 10;
    this.fieldWidth = 10;
    this.botHeight = 10;
    this.botWidth = 10;
    this.currentField = this.galacticAField;
    this.pathIndex = 0;
    setInterval( () => {
      this.updateField();
    },10)
    NetworkTables.addKeyListener("/Position/r_path",(key,value) => {
      this.rotation = value;
    }, true);
    NetworkTables.addKeyListener("/Position/x_path",(key,value) => {
      this.x = value;
    }, true);
    NetworkTables.addKeyListener("/Position/y_path",(key,value) => {
      this.y = value;
    }, true);
    NetworkTables.addKeyListener("/Other/Intake",(key,value) => {
      this.usingIntake = value;
    }, true);
    NetworkTables.addKeyListener("/PathFollowing/index",(key,value) => {
      this.pathIndex = value;
    }, true);
    NetworkTables.addKeyListener("/Preferences/AutoMode",(key,value) => {
      console.log(key,value);
      switch (value){
        case 0:
          this.currentField = this.galacticAField;
          break;
        case 1:
          this.currentField = this.barrelField;
          break;
        case 2:
          this.currentField = this.slalomField;
          break;
        case 3:
          this.currentField = this.bounceField;
          break;
        default:
          this.currentField = this.galacticBField;
          break;
      }
    }, true);
  }

  async handleFileInput(files: FileList) {
    this.pathPoints = [];
    this.uploadedFile = files.item(0);
    let text = await this.uploadedFile.text();
    let lines = text.split("\n")
    for(let line of lines){
      let vals = line.split(",");
      if(vals.length == 1){
        continue;
      }
      this.pathPoints.push({
        i: lines.indexOf(line),
        x: Number(vals[0]),
        y: Number(vals[1]),
        scalar: Number(vals[2]),
        intake: Number(vals[3]) == 1,
        backwards: Number(vals[4]) == 1
      });
    }
    this.pathIndex = 0;
    this.updateField();
  }

  updateField(){
    if(this.field==null || this.bot==null){
      return;
    }
    this.fieldWidth = this.field.nativeElement.offsetWidth;
    this.fieldHeight = this.field.nativeElement.offsetHeight;
    let botWidth = this.bot.nativeElement.offsetWidth;
    if(Math.abs(botWidth - this.botWidth)>1){
      this.botWidth = botWidth;
    }
    let botHeight = this.bot.nativeElement.offsetHeight;
    if(Math.abs(botHeight - this.botHeight)>1){
      this.botHeight = botHeight;
    }
  }

  getStyle(){
    let xRange = this.maxX - this.minX;
    let yRange = this.maxY - this.minY;
    let x = (this.x - this.minX)/xRange * this.fieldWidth - this.botWidth/2;
    let y = (1 -(this.y - this.minY)/yRange) * this.fieldHeight - this.botHeight/2;
    return 'top: '+y.toString()+'px; '
      +'left:'+x.toString()+'px;'
      +'transform: rotate('+(-this.rotation - 90).toString()+"deg);";
  }

  getPointStyle(p:Point){
    let radius = 15;
    let xRange = this.maxX - this.minX;
    let yRange = this.maxY - this.minY;
    let x = (p.x - this.currentField.xOffset - this.minX)/xRange * this.fieldWidth - radius/2;
    let y = (1 -(p.y -this.currentField.yOffset - this.minY)/yRange) * this.fieldHeight - radius/2;
    return 'top: '+y.toString()+'px; '
      +'left:'+x.toString()+'px;'
      +'background-color:'+(p.color ?? "#ffd200")+";";
  }

  getPathPoints(): PathPoint[]{
    if(this.pathIndex==0){
      return this.pathPoints;
    }
    return this.pathPoints.slice(this.pathIndex, this.pathIndex + Math.floor(this.pathPoints.length / 5));
  }

  getBoxStyle(b:Box){
    let xRange = this.maxX - this.minX;
    let yRange = this.maxY - this.minY;
    let x1 = (b.p1.x - this.currentField.xOffset - this.minX)/xRange * this.fieldWidth;
    let y1 = (1 -(b.p1.y - this.currentField.yOffset - this.minY)/yRange) * this.fieldHeight;
    let x2 = (b.p2.x - this.currentField.xOffset - this.minX)/xRange * this.fieldWidth;
    let y2 = (1 -(b.p2.y - this.currentField.yOffset - this.minY)/yRange) * this.fieldHeight;
    let top = Math.min(y1,y2);
    let left = Math.min(x1,x2);
    let height = Math.abs(y1 - y2);
    let width = Math.abs(x1 - x2);
    return 'top: '+top.toString()+'px; '
      +'left:'+left.toString()+'px;'
      +'width:'+width.toString()+'px;'
      +'height:'+height.toString()+'px;'
      +'border-color:'+(b.color ?? "#ffd200")+";";
  }

  getPathPointStyle(p: PathPoint){
    let xRange = this.maxX - this.minX;
    let yRange = this.maxY - this.minY;
    let x = (p.x - this.minX)/xRange * this.fieldWidth;
    let y = (1 -(p.y - this.minY)/yRange) * this.fieldHeight;
    let size = p.scalar * 2;

    return 'top: '+(y - size/2).toString()+'px; '
      +'left:'+(x-size/2).toString()+'px;'
      +'width:'+size.toString()+"px;height:"+size.toString()+"px;";
  }

  pointFromCoord(c: string, color?: string): Point{
    c = c.toUpperCase();
    let col = (c.charCodeAt(0) - 67) * -1;
    let row = Number(c.substring(1));
    let xPos = row * 30 * 0.0254;
    let yPos = col * 30 * 0.0254;
    return {
      x: xPos,
      y: yPos,
      color: color,
    }
  }

}

export interface Point{
  x: number;
  y: number;
  color?: string;
}

export interface Box{
  p1: Point;
  p2: Point;
  color?: string;
}

export interface Field{
  xOffset: number;
  yOffset: number;
  points: Point[];
  boxes: Box[];
}

export interface PathPoint{
  i: number;
  x: number;
  y: number;
  scalar: number;
  intake: boolean;
  backwards: boolean;
}
