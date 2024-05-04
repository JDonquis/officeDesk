const {app, BrowserWindow, screen } = require('electron');
const path = require('path'); 

class HandlerWindow
{	
	win = null;
		
	closeWin()
	{
		this.win.close();
	}

	showWin()
	{
		this.win.show()
	}

	sendData(event,data)
	{
		this.win.webContents.send(event, data);
	}

	loginWin() 
	{
	  const login = new BrowserWindow({
	    width: 600,
	    height: 800,
	    minWidth: 600,
	    minHeight: 800,
	    icon:path.join(__dirname,'assets/icons/logo.png'),
	    webPreferences: {
	      // nodeIntegration: true,
	      // contextIsolation: true,
	      // devTools: false,
	      preload: path.join(__dirname, 'assets/js/login.js')
	    }
	  });

	  this.win = login;

	  this.win.loadFile('index.html');
	}


	dashboardWin()
	{	
		const { width, height } = screen.getPrimaryDisplay().workAreaSize;
		const dashboard = new BrowserWindow
		({
			width:width,
			height:height,
			minWidth:800,
			minHeight:800,
	    	icon:path.join(__dirname,'assets/icons/logo.png'),
			webPreferences: 
			{
		     // nodeIntegration: true,
		     // contextIsolation:true,
		     // devTools:false,
		      preload:path.join(__dirname, 'assets/js/dashboard.js')
	    	}
		});

		this.win = dashboard;

		const dahsboardPath = path.join(__dirname, 'views/dashboard.html')

		this.win.loadFile(dahsboardPath)
	}
}

const handlerWindow = new HandlerWindow;

module.exports = {

	handlerWindow
}