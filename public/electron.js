const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
require('dotenv').config()

const { app, BrowserWindow, ipcMain } = electron;
require('@electron/remote/main').initialize();

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        //size defaults to 800x800
        title: 'Palmetto',
        resizable: false,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true, 
            contextIsolation: false
        }
    });
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`);
}
//when ready create our browser window
app.on('ready', () => {
    createWindow();
});

ipcMain.on('exit-app', () => {
    mainWindow = null; //garbage collection
    app.exit();
});
//ipc
ipcMain.on('minimize', () => {
    mainWindow.minimize();
});

