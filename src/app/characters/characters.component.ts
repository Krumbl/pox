import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IpcService } from '../services/ipc.service'
import { Account } from './models/account'

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  accounts: Map<string, Account>

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.ipcService.on('other-custom-signal', (event, arg) => {
      // console.log('Received acknowledged from backend about receipt of our signal.');
      // console.log(arg);
    // })

    // console.log('Sending message to backend.');
    // this.ipcService.send('my-custom-signal', 'hello, are you there?');

    this.fetchCharacters()
  }

  fetchCharacters() {
    this.ipcService.once('query.accounts', (event, args) => {
      console.log('account response ' + args.size)
      
      this.accounts = args
      this.cdRef.detectChanges();
    });
    this.ipcService.send('query', 'accounts');
  }

}
