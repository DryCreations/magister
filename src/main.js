const { app, BrowserWindow, dialog, ipcMain, session } = require('electron');
const path = require('path');
const serve = require('electron-serve');
const loadURL = serve({ directory: 'public' });
const axios = require('axios');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'data/data.db', autoload: true });

const authFlow = require('./modules/auth').authFlow;

let githubql;

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
        db.persistence.compactDatafile()
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

const GET_USER = `
{
    viewer {
        login
    }
}
`;

// set app info
ipcMain.on('set-oauth-app', (event, arg) => {
    db.update({ type: 'oauth-app' }, {$set : { selected: false }}, {upsert: false}, () => {
        db.update({ client_id: arg, type: 'oauth-app' }, {$set : { selected: true }}, {upsert: false}, () => {
            db.find({ type: 'oauth-app' }, (err, docs) => {
                event.sender.send('update-app-info', docs);
            })
        })
    })
})

// set auth info
ipcMain.on('set-oauth-token', (event, arg) => {
    db.update({ type: 'oauth-token' }, {$set : { selected: false }}, {upsert: false}, () => {
        db.update({ login: arg, type: 'oauth-token' }, {$set : { selected: true }}, {upsert: false}, () => {
            db.find({ type: 'oauth-token' }, (err, docs) => {
                event.sender.send('update-token-info', docs);
            })
        })
    })
})

// add new app info flow
ipcMain.on('add-oauth-app', (event, arg) => {
    db.update({ client_id: arg.client_id, type: 'oauth-app' }, {...arg, type: 'oauth-app', selected: false}, {upsert: true}, () => {
        db.find({ type: 'oauth-app' }, (err, docs) => {
            event.sender.send('update-app-info', docs);
        })
    });
})

// add new auth info flow
ipcMain.on('add-oauth-token', (event, arg) => {
    db.find({ selected: true, type: 'oauth-app' }, (err, docs) => {
        authFlow(docs[0]).then((response) => {
            githubql = axios.create({
                baseURL: 'https://api.github.com/graphql',
                headers: {
                    Authorization: `${response.token_type} ${response.access_token}`,
                },
            });
    
            githubql
            .post('', { query: GET_USER })
            .then(({data: { data }}) => {
                console.log(data);
                db.update({ login: data.viewer.login, type: 'oauth-token' }, {...response, login: data.viewer.login, type: 'oauth-token', selected: false}, {upsert: true}, () => {
                    db.find({ type: 'oauth-token' }, (err, docs) => {
                        event.sender.send('update-token-info', docs);
                    })
                });
            });
        })
    })
})

// get app info
ipcMain.on('get-app-info', (event, arg) => {
    db.find({ type: 'oauth-app' }, (err, docs) => {
        event.sender.send('update-app-info', docs);
    }) 
})

// get auth info
ipcMain.on('get-token-info', (event, arg) => {
    db.find({ type: 'oauth-token' }, (err, docs) => {
        event.sender.send('update-token-info', docs);
    }) 
})

const TEST_QUERY = `
{
    viewer {
      login
      name
      repositories(first: 100) {
        nodes {
          nameWithOwner
          url
        }
      }
    }
  }
`;

// make query
ipcMain.on('graph-query', (event, arg) => {
    db.find({ selected: true, type: 'oauth-token' }, (err, docs) => {
        let oauth_token = docs[0].access_token;
        let token_type = docs[0].token_type;

        githubql = axios.create({
            baseURL: 'https://api.github.com/graphql',
            headers: {
                Authorization: `${token_type} ${oauth_token}`,
            },
        });

        githubql
        .post('', { query: TEST_QUERY })
        .then(({data: { data }}) => {
            console.log(data);
        });
    })
})