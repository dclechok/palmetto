const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, ipcMain } = electron;
require('@electron/remote/main').initialize();

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Palmetto',
        resizable: false,
        autoHideMenuBar: true,
        frame: false,
        // titleBarStyle: 'hidden',
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true, 
            contextIsolation: false
        }
    });
    // mainWindow.loadURL(`file://${path.join(__dirname, '/index.html')}`);
    mainWindow.loadURL('http://localhost:3000');
});

ipcMain.on('exit-app', () => {
    console.log('here 2')
    app.exit();
});

