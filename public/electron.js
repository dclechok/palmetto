const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, ipcMain } = electron;
require('@electron/remote/main').initialize();

let mainWindow;

app.on('ready', () => {
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
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, '/index.html'),
    //     protocol: 'file:'
    // }));
    mainWindow.loadURL('http://localhost:3000');
});

ipcMain.on('exit-app', () => {
    mainWindow = null; //garbage collection
    app.exit();
});

