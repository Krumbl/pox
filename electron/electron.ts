import { SelectMultipleControlValueAccessor } from "@angular/forms";
// requires tsc to compile `npm install -g typescript`
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { OS } from "./OS";
import { DataStore } from "./mbox/dataStore";
import { Log } from "./log";

const log = new Log()

// const dataStore = new DataStore('/Applications/World of Warcraft/_retail_/WTF');
const dataStore = new DataStore('D:\\Blizzard\\World of Warcraft\\_retail_\\WTF')

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        x: 2600,
        y: 1000,
        width:1200,
        webPreferences: {
            nodeIntegration: true, // Allows IPC and other APIs
        }
    });
    var isProd = false;
    if (isProd) {
        mainWindow.loadFile(path.join(__dirname, "../dist/pox/index.html"));
    } else {
        mainWindow.loadURL('http://localhost:4200/');
    }
    mainWindow.webContents.openDevTools()
});

app.on("window-all-closed", () => {app.quit()});

ipcMain.on('my-custom-signal', (event, arg) => {
    console.log('Print to the main process terminal (STDOUT) when signal received from renderer process.');
    // console.log(event);
    console.log(arg);
    mainWindow.webContents.send('other-custom-signal', 'message from the backend process');
});

ipcMain.on('os.cpu', async (event, arg) => {
    log.trace('os.cpu')
    await new Promise(resolve => setTimeout(resolve, 2000));
    mainWindow.webContents.send('os.cpu', OS.getCpus());
});

ipcMain.on('os.memory', async (event, arg) => {
    log.trace('os.memory')
    await new Promise(resolve => setTimeout(resolve, 2000));
    mainWindow.webContents.send('os.memory', OS.getMemory());
});

ipcMain.on('character.summary', (event,args) => {
    log.trace('character.summary')
    mainWindow.webContents.send('character.summary', dataStore.currency.getText());
});

ipcMain.on('query', (event, request) => {
    log.info('query ' + request);
    if (request === 'accounts') {
        log.warn('query accounts ' + dataStore.accounts.size)
        mainWindow.webContents.send('query.accounts', dataStore.accounts)
    }
    
});