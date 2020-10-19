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
  servers

  accountsList

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchCharacters()
  }

  fetchCharacters() {
    this.ipcService.once('query.accounts', (event, args) => {
      console.log('account response ' + args.size)
      
      this.accounts = args
      console.log(this.accounts)
      // FIXME use real account list
      // this.servers = Array.from(this.accounts.values())[7].servers
      this.cdRef.detectChanges();
    });
    // this.ipcService.send('query', 'accounts');

    this.ipcService.once('query.serverList', (event, args) => {
      console.log('server response ' + args.size)
      
      this.servers = args
      this.ipcService.send('query', 'accounts');
      // this.cdRef.detectChanges();
    });
    this.ipcService.send('query', 'serverList');
  }

}
