import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare const NetworkTables: any;

@Component({
  selector: 'app-misctables',
  templateUrl: './misctables.component.html',
  styleUrls: ['./misctables.component.scss']
})
export class MisctablesComponent implements AfterViewInit {

  @ViewChild("dropdown") dropdown: ElementRef;

  driveCmd: string;

  autoModes = ["Galactic", "Barrel", "Slalom", "Bounce"];

  selectedAutoMode;

  constructor() {
    this.selectedAutoMode = -1;
    this.driveCmd = "0";
    NetworkTables.addKeyListener("/LiveWindow/Drivetrain/.command",(key,value) => {
      console.log()
      this.driveCmd = value;
    }, true);
    NetworkTables.addKeyListener("/Preferences/AutoMode",(key,value) => {
      this.selectedAutoMode = value;
    }, true);
  }

  selectAutoMode(mode: number){
    NetworkTables.setValue("/Preferences/AutoMode",mode);
  }

  ngAfterViewInit(): void {
    this.dropdown.nativeElement.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dropdown.nativeElement.classList.toggle('is-active');
    });
  }
}
