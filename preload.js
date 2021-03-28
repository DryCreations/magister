const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('browser', {
    close: () => ipcRenderer.send('close'),
    minimize: () => ipcRenderer.send('minimize'),
    maximize: () => ipcRenderer.send('maximize')
})