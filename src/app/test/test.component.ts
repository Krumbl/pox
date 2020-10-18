import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { IpcService } from '../services/ipc.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {

  counter: number = 0

  cards = [
    { title: 'Summary', content: '#Characters/$Gold', cols: 1, rows: 1 },
    { title: 'PC', content: 'Cores/Memory', cols: 1, rows: 1 }
  ];


  constructor(
    private ipcService: IpcService,
    private cdRef: ChangeDetectorRef
  ) { 
    // this.ipcService.on('os.cpu', this.onClickMe);
    this.ipcService.on('os.cpu', (event, arg) => {
      console.log('os.cpu');
      this.onClickMe();
    });
    this.ipcService.send('os.cpu')
  }
  ngOnDestroy(): void {
    console.log('test ngOnDestroy');
    this.ipcService.removeListener('os.cpu', this.onClickMe);
  }

  ngOnInit(): void {
    console.log('test ngOnInit');
    // this.counter = 1
  }

  onClickMe() {
    console.log('onClickMe');
    this.counter = this.counter + 1;
    this.cards.push({ title: 'IPC', content: 'IPC', cols: 1, rows: 1 });
    this.cdRef.detectChanges();
  }

}
