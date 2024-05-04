const User = require('./models/UserModel.js');
const Activity = require('./models/ActivityModel.js');
const Location = require('./models/LocationModel.js');
const Office = require('./models/OfficeModel.js');
const Division = require('./models/DivisionModel.js');
const Department = require('./models/DepartmentModel.js');
const TypeUser = require('./models/TypeUserModel.js');


const Store = require('electron-store');
const { Notification } = require('electron');


const store = new Store();

function registerHandlers(ipcMain,handlerWindow)
{	
	ipcMain.handle('login', async (event, $request) => 
	{	
		try
		{
			const response = await User.login($request);

			if(response.code == 200)
			{
				new Notification(
				{
		       
		         title:"Login",
		         body: response.message
		       
		       }).show()


				handlerWindow.closeWin()
				handlerWindow.dashboardWin()

			    handlerWindow.sendData('userData',response.data)



			}

			else if(response.code == 400)
			{
				new Notification(
				{
		       
		         title:"Login",
		         body: response.message
		       
		       }).show()

			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})


	// ----------------------------------------------------------- DAHSBOARD ROUTES

	ipcMain.handle('getActivities', async (event, $request) => 
	{	
		try
		{
			const response = await Activity.get($request);

			if(response.code == 200)
			{
			
			    handlerWindow.sendData('activities',response.data)


			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})

	ipcMain.handle('getBoxListForActivities', async (event, $request) => 
	{	
		try
		{
			const [ locations, offices, divisions, departments, typeUsers ] = await Promise.all(
				[
				    Location.get(),
				    Office.get(),
				    Division.get(),
				    Department.get(),
				    TypeUser.get()
				  ]
				);


			if(
				locations.code == 200 &&
				offices.code == 200 &&
				divisions.code == 200 &&
				departments.code == 200 &&
				typeUsers.code == 200
				
			 )
			{	
				const response = 
				{
					locations,
					offices,
					divisions,
					departments,
					typeUsers,
				}
			
			    handlerWindow.sendData('boxListForActivities',response)


			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})

	ipcMain.handle('createActivity', async (event, $request) => 
	{	
		try
		{
			const response = await Activity.create($request);

			if(response.code == 200)
			{	

				new Notification(
				{
		       
		         title:"Actividad registrada exitosamente",
		         body: "La Actividad ha sido guardada exitosamente"
		       
		       }).show()
			
			    handlerWindow.sendData('activityCreated',response.data)


			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})

	ipcMain.handle('updateActivity', async (event, $request) => 
	{	
		try
		{
			const response = await Activity.update($request);

			if(response.code == 200)
			{	

				new Notification(
				{
		       
		         title:"Actividad actualizada exitosamente",
		         body: "La Actividad ha sido actualizada exitosamente"
		       
		       }).show()
			
			    handlerWindow.sendData('activityUpdated',response.data)


			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})


	ipcMain.handle('deleteActivity', async (event, $request) => 
	{	
		try
		{
			const response = await Activity.destroy($request);

			if(response.code == 200)
			{	

				new Notification(
				{
		       
		         title:"Actividad eliminada exitosamente",
		         body: "La Actividad ha sido eliminada exitosamente"
		       
		       }).show()
			
			    handlerWindow.sendData('activitydeleted',response.data)


			}

		}
		catch(error)
		{
			console.log(error.errorMessage)
			
			new Notification(
			{
	       
	         title:"Login",
	         body: error.message
	       
	       }).show()	

		}
	})

	
}

module.exports = registerHandlers