
const { BrowserWindow, session } = require('electron');

const axios = require('axios');

module.exports = {
    authFlow: (options) => {
        return new Promise(function(resolve, reject) {
            let authSession = session.fromPartition('auth_session');
    
            authSession.clearCache();
            authSession.clearAuthCache();
            authSession.clearStorageData();
        
            let authWindow = new BrowserWindow({
                width: 600,
                height: 850,
                show: false,
                webPreferences: {
                    nodeIntegration: false, // is default value after Electron v5
                    contextIsolation: true, // protect against prototype pollution
                    enableRemoteModule: false, // turn off remote
                    partition: 'auth_session'
                } 
            });
            authWindow.removeMenu();
            let githubUrl = 'https://github.com/login/oauth/authorize?';
            let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
            authWindow.loadURL(authUrl);
            
            authWindow.once('ready-to-show', () => {
                authWindow.show()
            });
        
            function handleCallback (url) {
                url = new URL(url);
        
                console.log(url)
        
                if (url.host == 'localhost') {
                    let code = url.searchParams.get('code');
                    axios({
                        method: 'post',
                        url: 'https://github.com/login/oauth/access_token',
                        data: {
                            code: code,
                            client_id: options.client_id,
                            client_secret: options.client_secret
                        },
                        headers: {
                            Accept: 'application/json'
                        }
                    }).then((response) => {
                        resolve(response.data);
                    }).catch(function (error) {
                        reject(error);
                    });
                    authWindow.close();
                }
            }
            
            authWindow.webContents.on('will-navigate', function (event, url) {
                handleCallback(url);
            });
            
            authWindow.on('close', function() {
                authWindow = null;
            }, false);
        });
    }
} 