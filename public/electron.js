const electron = require('electron');
const path = require('path');

const { app, BrowserWindow } = electron;
require('@electron/remote/main').initialize();

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'Palmetto',
        resizable: false,
        autoHideMenuBar: true,
        // frame: false,
        webPreferences: {
            enableRemoteModule: true,
        }
    });
    // mainWindow.loadURL(`file://${path.join(__dirname, '/index.html')}`);
    mainWindow.loadURL('http://localhost:3000');
});
