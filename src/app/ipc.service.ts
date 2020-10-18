import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from 'electron'
import isElectron from 'is-electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipcRenderer: IpcRenderer;

  constructor() {
    
    if (isElectron()) {
      try {
        this.ipcRenderer = (<any>window).require('electron').ipcRenderer
      } catch (error) {
        throw error
      }
    } else {
      console.warn('Not running in electron')
    }
  }

  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    if (this.ipcRenderer) {
      this.ipcRenderer.on(channel, listener)
    }
  }

  send(channel: string, ...args: any[]) {
    if (this.ipcRenderer) {
      this.ipcRenderer.send(channel, args)
    }
  }

}
