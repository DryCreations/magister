const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });

let mainWindow;

function isDev() {
    return !app.isPackaged;
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        },
        icon: isDev() ? path.join(process.cwd(), 'public/favicon.png') : path.join(__dirname, 'public/favicon.png'),
        show: false,
        frame: false
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5000/');
    } else {
        loadURL(mainWindow);
    }

    //process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.removeMenu();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    if (mainWindow === null) createWindow()
});

ipcMain.on('close', (event, arg) => {
    mainWindow.close();
})

ipcMain.on('minimize', (event, arg) => {
    mainWindow.minimize();
})

ipcMain.on('maximize', (event, arg) => {
    mainWindow.maximize();
})