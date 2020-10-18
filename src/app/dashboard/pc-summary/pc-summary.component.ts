import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
const prettyBytes = require('pretty-bytes');

@Component({
  selector: 'app-pc-summary',
  templateUrl: './pc-summary.component.html',
  styleUrls: ['./pc-summary.component.css']
})
export class PcSummaryComponent implements OnInit, OnDestroy {

  stats = {pc:{cpu:"",memory:{free:"", inuse:"", total:""}}}

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { 
  }
  

  ngOnInit(): void {
    this.updateCpu()
    this.updateMemory()
  }

  ngOnDestroy(): void {
  }

  callbackClosure(callback) {
    return (event, args) => {
      callback(event, args);
    }
  }

  updateCpu() {
    this.ipcService.once('os.cpu', (event, args) => {
      this.stats.pc.cpu = args[0].model;
      this.cdRef.detectChanges();
    });

    this.ipcService.send('os.cpu');
  }

  updateMemory() {
    this.ipcService.once('os.memory', (event, args) => {
      console.log(args);
      this.stats.pc.memory = {
        "free":prettyBytes(args.freemem),
        "inuse":prettyBytes(args.totalmem - args.freemem),
        "total":prettyBytes(args.totalmem),
      }
      this.cdRef.detectChanges();
    });
    this.ipcService.send('os.memory');
  }

}
