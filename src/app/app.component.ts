import { Component } from '@angular/core';
// FIXME load electron only in electron app
// const electron = (<any>window).require('electron');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pox';
   constructor() {
    // electron.ipcRenderer.on('other-custom-signal', (event, arg) => {
    //   console.log('Received acknowledged from backend about receipt of our signal.');
    //   console.log(event);
    //   console.log(arg);
    // })

    // console.log('Sending message to backend.');
    // electron.ipcRenderer.send('my-custom-signal', 'hello, are you there?');
  }
}
