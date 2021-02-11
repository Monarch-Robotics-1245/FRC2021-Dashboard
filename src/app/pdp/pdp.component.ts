import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-pdp',
  templateUrl: './pdp.component.html',
  styleUrls: ['./pdp.component.scss']
})
export class PdpComponent implements AfterViewInit {
  @ViewChild("pdpHolder") pdpHolder: ElementRef;

  interval;

  constructor() {
    this.interval = setInterval( () => {
      this.scalePdp();
    },50)
  }

  scalePdp(){
    let parentW = this.pdpHolder.nativeElement.parentElement.offsetWidth;
    let parentH = this.pdpHolder.nativeElement.parentElement.offsetHeight;
    if(parentW == 0 || parentH==0){
      return;
    }
    if(this.interval !=null){
      clearInterval(this.interval);
    }
    let childW = this.pdpHolder.nativeElement.childNodes[0].offsetWidth;
    let childH = this.pdpHolder.nativeElement.childNodes[0].offsetHeight;
    let scale = Math.min(parentW / childW, parentH / childH);
    this.pdpHolder.nativeElement.childNodes[0].style = "transform: translate(0px,-"+(this.pdpHolder.nativeElement.offsetHeight/2-childH*scale/2)+"px) scale("+scale+","+scale+")"

  }

  ngAfterViewInit(): void {
    this.scalePdp();
  }

}
