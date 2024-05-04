const db = require('./Database.js')
const bcrypt = require("bcrypt");

class Activity
{
	async get($request)
	{
		 const userId = $request.id;	

		 const sql = `SELECT
					A.id, A.code, A.status, A.title, A.user_id, A.today_date, A.start_date, A.end_date, A.location_id, A.office_id, A.division_id, A.department_id,
					A.progress, A.observation,

					U.name as user_name, U.last_name as user_last_name,
					
					L.id as location_id, L.name as location_name, 
					
					O.id as office_id, O.name as office_name, 
					
					D.id as division_id, D.name as division_name, 
					
					DE.id as deparment_id, DE.name as department_name 
					
					FROM activities as A
					
					INNER JOIN users as U on A.user_id = U.id
					INNER JOIN locations as L on A.location_id = L.id
					INNER JOIN offices as O on A.office_id = O.id
					INNER JOIN divisions as D on A.division_id = D.id
					INNER JOIN departments as DE on A.department_id = DE.id
					
					WHERE user_id=?

					ORDER BY id DESC`;

		 return new Promise((resolve,reject) => 
		 {

		 	db.query(sql, [userId], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador', errorMessage:error.message});
			
			
			    if(results.length > 0)    	
			       	resolve({code:200, data:results, message:'OK', errorMessage:null});
		
			    else
			       	resolve({code:404, data:null, message:'No se han encontrado registros', errorMessage:null})
		    
		    });

		 })
	}

	async getLastCode()
	{

		 const sql = `SELECT code FROM activities ORDER BY code DESC LIMIT 1`;

		 return new Promise((resolve,reject) => 
		 {

		 	db.query(sql, [], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador 2', errorMessage:error.message});
			
			
			    if(results.length > 0)    	
			       	resolve({code:200, data:results[0], message:'OK', errorMessage:null});
		
			    else
			       	resolve({code:404, data:{code:0}, message:'No se han encontrado registros', errorMessage:null})
		    
		    });

		 })
	}

	async create($request)
	{

		let lcode = await this.getLastCode();
		let lastCode = lcode.data.code;

		let status; 
		let codeRequest;
		let title; 
		let userId; 
		let todayDate;
		let startDate; 
		let endDate; 
		let locationId; 
		let officeId; 
		let divisionId; 
		let departmentId; 
		let progress; 
		let observation; 

		if($request.replicate)
		{
			status = $request.statusUpdate;
			codeRequest = $request.activityCode;
			title = $request.titleActivityUpdate; 	
			userId = $request.userId; 
			todayDate = $request.todayDate;
			startDate = $request.startDateActivityUpdate;
			endDate = $request.endDateActivityUpdate;
			locationId = $request.locationsBoxUpdate;
			officeId = $request.officesBoxUpdate;
			divisionId = $request.divisionsBoxUpdate;
			departmentId = $request.departmentsBoxUpdate;
			progress = $request.progressUpdate;
			observation = $request.observationUpdate;
		}
		else
		{
			 status = $request.status;
			 codeRequest = $request.activityCode;
			 title = $request.titleActivityInput; 	
			 userId = $request.userId; 
			 todayDate = $request.todayDate;
			 startDate = $request.startDateActivity;
			 endDate = $request.endDate;
			 locationId = $request.locationsBox;
			 officeId = $request.officesBox;
			 divisionId = $request.divisionsBox;
			 departmentId = $request.departmentsBox;
			 progress = $request.progress;
			 observation = $request.observation;
		}

		

		if(codeRequest == '' || codeRequest == null || codeRequest == NaN)
			codeRequest = lastCode + 1;
		
		

		 const sql = `INSERT INTO activities 
		 (
		 id,
		 code,
		 status,
		 title,
		 user_id,
		 today_date,
		 start_date,
		 end_date,
		 location_id,
		 office_id,
		 division_id,
		 department_id,
		 progress,
		 observation
		 ) 
		 VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

		 return new Promise((resolve,reject) => 
		 {
		 	let flags = 0;

		 	if(title == '' || title == null)
		 	{	
		 		flags = 1
			    reject({code:500, data:null, message:'El titulo de la actividad no puede ser nulo', errorMessage:'El titulo es nulo'});
		 	}

			if(startDate == '' || startDate == null)
			{
		 		flags = 1
			    reject({code:500, data:null, message:'La fecha de inicio de la actividad no puede ser nulo', errorMessage:'La fecha de inicio es nulo'});
			}

			


			if(flags == 0)
			{
				db.query(sql, 
				[
					codeRequest,	
			 		status,
			 		title,
			 		userId,
			 		todayDate,
			 		startDate,
			 		endDate,
			 		locationId,
			 		officeId,
			 		divisionId,
			 		departmentId,
			 		progress,
			 		observation 
		 		], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador', errorMessage:error.message});
			
			
			    if(results)    	
			       	resolve({code:200, data:results, message:'OK', errorMessage:null});
		    
		    });
			}

		 	

		 })
	}

	async update($request)
	{
		let activityId = $request.activityId;
		let status = $request.statusUpdate;
		let title = $request.titleActivityUpdate; 	
		let userId = $request.userId; 
		let startDate = $request.startDateActivityUpdate;
		let endDate = $request.endDateActivityUpdate;
		let locationId = $request.locationsBoxUpdate;
		let officeId = $request.officesBoxUpdate;
		let divisionId = $request.divisionsBoxUpdate;
		let departmentId = $request.departmentsBoxUpdate;
		let progress = $request.progressUpdate;
		let observation = $request.observationUpdate;

		




		 const sql = `UPDATE activities
		  SET status = ?, 
		  title = ?, 
		  start_date = ?, 
		  end_date = ?, 
		  location_id = ?, 
		  office_id = ?, 
		  division_id = ?, 
		  department_id = ?, 
		  progress = ?, 
		  observation = ? 
		  WHERE activities.id = ?;`;

		 return new Promise((resolve,reject) => 
		 {
		 	let flags = 0;

		 	if(title == '' || title == null)
		 	{	
		 		flags = 1
			    reject({code:500, data:null, message:'El titulo de la actividad no puede ser nulo', errorMessage:'El titulo es nulo'});
		 	}

			if(startDate == '' || startDate == null)
			{
		 		flags = 1
			    reject({code:500, data:null, message:'La fecha de inicio de la actividad no puede ser nulo', errorMessage:'La fecha de inicio es nulo'});
			}

			if(progress == '' || progress == null)
			{
				progress = 0;
			}

			if(flags == 0)
			{
				db.query(sql, [
		 		status,
		 		title,
		 		startDate,
		 		endDate,
		 		locationId,
		 		officeId,
		 		divisionId,
		 		departmentId,
		 		progress,
		 		observation, 
		 		activityId,
		 		], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador', errorMessage:error.message});
			
			
			    if(results)    	
			       	resolve({code:200, data:results, message:'OK', errorMessage:null});
		    
		    });
			}

		 	

		 })
	}


	async destroy($request)
	{
		 const activityId = $request;	

		 const sql = `DELETE FROM activities WHERE activities.id = ?`;

		 return new Promise((resolve,reject) => 
		 {

		 	db.query(sql, [activityId], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador', errorMessage:error.message});
			
			
			    if(results)    	
			       	resolve({code:200, data:results, message:'OK', errorMessage:null});
		    
		    });

		 })
	}

}

const activity = new Activity();

module.exports = activity;

