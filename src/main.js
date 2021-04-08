const { app, BrowserWindow, dialog, ipcMain, session } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/data.db', autoload: true });

const authFlow = require('./modules/auth').authFlow;

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

    if (isDev()) {
        //process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.removeMenu();

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    });
    
    app.on('activate', function () {
        if (mainWindow === null) createWindow()
    });

    mainWindow.on('maximize', function() {
        mainWindow.webContents.send('maximize');
    })

    mainWindow.on('unmaximize', function() {
        mainWindow.webContents.send('unmaximize');
    })
}

app.on('ready', createWindow);

ipcMain.on('close', (event, arg) => {
    mainWindow.close();
})

ipcMain.on('minimize', (event, arg) => {
    mainWindow.minimize();
})

ipcMain.on('maximize', (event, arg) => {
    mainWindow.maximize();
})

ipcMain.on('unmaximize', (event, arg) => {
    mainWindow.unmaximize();
})

ipcMain.on('github-oauth', (event, arg) => {
    authFlow().then((response) => {
        event.sender.send('github-oauth', response.data);
        console.log(response);
    })
})