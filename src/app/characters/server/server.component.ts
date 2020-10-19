import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { IpcService } from 'src/app/services/ipc.service';
import { Account } from '../models/account';
import { Server } from '../models/server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input()
  server: Server
  accounts: Map<string, Account>

  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ipcService.once('query.accountList', (event, args) => {
      console.log('server response ' + args.size)
      
      this.accounts = args
      this.cdRef.detectChanges();
    });
    this.ipcService.send('query', 'accountList')
  }

}
