const electron = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

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
    //     pathname: path.join(__dirname, '../build/index.html'),
    //     protocol: 'file:'
    // }));
    mainWindow.loadURL(isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`);
});

ipcMain.on('exit-app', () => {
    mainWindow = null; //garbage collection
    app.exit();
});

