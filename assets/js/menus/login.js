const {app, Menu} = require('electron');

const setMainMenu = () =>{
	
	const template = 
	[
		{
			label:"Bitacora",
			submenu:
			[
				{role:"quit"}
			]
		},
		{
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
	]

	const menu = Menu.buildFromTemplate(template);

	Menu.setApplicationMenu(menu);
}

module.exports = 
{
	setMainMenu
}