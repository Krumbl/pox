// requires tsc to compile `npm install -g typescript`
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

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
    console.log(event);
    console.log(arg);
    mainWindow.webContents.send('other-custom-signal', 'message from the backend process');
});