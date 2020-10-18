import { Component, OnInit } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';

@Component({
  selector: 'app-character-summary',
  templateUrl: './character-summary.component.html',
  styleUrls: ['./character-summary.component.css']
})
export class CharacterSummaryComponent implements OnInit {

  constructor(
    private ipcService: IpcService
  ) { 
  }

  ngOnInit(): void {
    this.ipcService.once('character.summary', (event, args) => {
      console.log('character response')
    });
    console.log("send character request");
    this.ipcService.send('character.summary');
  }

}
