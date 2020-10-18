import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.css']
})
export class CharacterSummaryComponent implements OnInit {

  currency: string

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { 
  }

  ngOnInit(): void {
    this.loadCurrency();
  }

  loadCurrency() {
    this.ipcService.once('character.summary', (event, args) => {
      console.log('character response ' + args)
      this.currency = args
      this.cdRef.detectChanges();
    });
    console.log("send character request");
    this.ipcService.send('character.summary');
  }

}
