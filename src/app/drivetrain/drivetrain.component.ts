import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drivetrain',
  templateUrl: './drivetrain.component.html',
  styleUrls: ['./drivetrain.component.scss']
})
export class DrivetrainComponent implements OnInit {

  left = 0;
  right = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  getBarY(val:number): number{
    if(val<0){
      return 250;
    }
    return 250 - this.getBarHeight(val);
  }

  getBarHeight(val: number):number{
    return Math.abs(val) * 240;
  }

}
