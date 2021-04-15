const { contextBridge, ipcRenderer } = require('electron')

// https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            let validChannels = [
                "close",
                "minimize", 
                "maximize", 
                "unmaximize",
                "set-oauth-app",
                "set-oauth-token",
                "add-oauth-app",
                "add-oauth-token",
                "get-app-info",
                "get-token-info",
                "graph-query",
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["maximize", "unmaximize", "update-app-info", "update-token-info"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);