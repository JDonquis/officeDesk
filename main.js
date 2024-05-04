const {app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('path'); 
const { setMainMenu } = require('./assets/js/menus/login.js')
const {handlerWindow} = require('./windows.js')
const registerHandlers = require('./handlers.js');




setMainMenu();
app.whenReady().then(() =>{

	handlerWindow.loginWin();
  registerHandlers(ipcMain,handlerWindow);
	
})




app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    handlerWindow.loginWin()
  }
})
