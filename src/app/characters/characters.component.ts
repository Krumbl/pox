import { Component, OnInit } from '@angular/core';
import { IpcService } from '../ipc.service'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(
    private ipcService: IpcService
  ) { }

  ngOnInit(): void {
    this.ipcService.on('other-custom-signal', (event, arg) => {
      console.log('Received acknowledged from backend about receipt of our signal.');
      // console.log(event);
      console.log(arg);
    })

    console.log('Sending message to backend.');
    this.ipcService.send('my-custom-signal', 'hello, are you there?');
  }

}
