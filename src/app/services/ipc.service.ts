import { Injectable } from '@angular/core';
import { IpcRenderer, IpcRendererEvent } from 'electron'
import isElectron from 'is-electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipcRenderer: IpcRenderer;

  constructor(
  ) {
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
      // TODO add changedetector to ipc listeners - will mess with remove?
      this.ipcRenderer.on(channel, listener)
    }
  }

  once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    if (this.ipcRenderer) {
      // TODO add changedetector to ipc listeners - will mess with remove?
      this.ipcRenderer.once(channel, listener)
    }
  }

  // doesn't work
  addListener(channel: string, listener: (event: IpcRenderer, ...args: any[]) => void) {
    var l = (event, args) => {
      listener(event, args);
    }
    this.on(channel, l);
    return l;
  }

  removeListener(channel: string, listener: (...args: any[]) => void) {
    if (this.ipcRenderer) {
      this.ipcRenderer.removeListener(channel, listener);
    }
  }

  // TODO add sendSync
  send(channel: string, ...args: any[]) {
    if (this.ipcRenderer) {
      this.ipcRenderer.send(channel, args)
    }
  }

}
