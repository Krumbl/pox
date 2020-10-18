import { SelectMultipleControlValueAccessor } from "@angular/forms";
// requires tsc to compile `npm install -g typescript`
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { OS } from "./OS";
import { DataStore } from "./mbox/dataStore";

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
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
    console.log('os.cpu')
    await new Promise(resolve => setTimeout(resolve, 2000));
    mainWindow.webContents.send('os.cpu', OS.getCpus());
});

ipcMain.on('os.memory', async (event, arg) => {
    console.log('os.memory')
    await new Promise(resolve => setTimeout(resolve, 2000));
    mainWindow.webContents.send('os.memory', OS.getMemory());
});

ipcMain.on('character.summary', (event,args) => {
    console.log('character.summary')
    mainWindow.webContents.send('character.summary', 'empty');
});