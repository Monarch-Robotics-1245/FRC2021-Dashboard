import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
declare const NetworkTables: any;

@Component({
  selector: 'app-misctables',
  templateUrl: './misctables.component.html',
  styleUrls: ['./misctables.component.scss']
})
export class MisctablesComponent implements AfterViewInit {

  toggleNetworkTables(){
    this.ntModal.nativeElement.classList.toggle('is-active');
  }

  changeIP(){
    let newIp = window.prompt("Enter the Network tables IP and port",localStorage.getItem("ntserver") || "localhost:8888");
    if(newIp==null || newIp == ""){
      return;
    }
    else{
      localStorage.setItem("ntserver",newIp);
      window.location.reload();
    }
  }

  @ViewChild("dropdown") dropdown: ElementRef;
  @ViewChild("modal") ntModal: ElementRef;

  driveCmd: string;

  autoModes = ["Galactic", "Barrel", "Slalom", "Bounce"];

  selectedAutoMode;
  connected: boolean;

  shooterSpeed: number;

  constructor() {
    this.shooterSpeed = 0;
    this.selectedAutoMode = -1;
    this.driveCmd = "";
    NetworkTables.addWsConnectionListener((connected) =>{
      this.connected = connected;
    }, true);
    NetworkTables.addKeyListener("/LiveWindow/Drivetrain/.command",(key,value) => {
      this.driveCmd = value;
    }, true);
    NetworkTables.addKeyListener("/Preferences/AutoMode",(key,value) => {
      this.selectedAutoMode = value;
    }, true);
    NetworkTables.addKeyListener("/Vision/Shooter",(key,value) => {
      console.log("New shoot",value);
      this.shooterSpeed = value;
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

  changeShooter(val: any){
    console.log("Changing shoot");
    NetworkTables.setValue("/Vision/Shooter",Number(val.toString()));
  }
}
