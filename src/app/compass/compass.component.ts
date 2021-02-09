import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var NetworkTables: any;

@Component({
  selector: 'app-compass',
  templateUrl: './compass.component.html',
  styleUrls: ['./compass.component.scss']
})
export class CompassComponent implements OnInit {

  @ViewChild("text") text: ElementRef;
  @ViewChild("spinny") spinny: ElementRef;

  rotation: number;

  constructor(private cd: ChangeDetectorRef) {
    this.rotation = 90;
    NetworkTables.addKeyListener("/Position/r_overall",(key,value) => {
      this.rotation = value;
      this.text.nativeElement.innerHTML = value.toString();
      this.spinny.nativeElement.style = "transform: rotate("+value.toString()+"deg);"
    });
  }

  newListener(key,value){
    console.log(key+" updated");
    this.rotation = value;
  }

  ngOnInit(): void {
  }

}
