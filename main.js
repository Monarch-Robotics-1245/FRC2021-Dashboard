const { app, BrowserWindow, screen } = require('electron');

function createWindow () {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile("dist/dashboard2021/index.html");
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
