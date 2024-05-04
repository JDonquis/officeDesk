const db = require('./Database.js')
const bcrypt = require("bcrypt");

class Department
{
	async get()
	{

		 const sql = `SELECT * FROM departments`;

		 return new Promise((resolve,reject) => 
		 {

		 	db.query(sql, [], (error, results, fields) => 
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

}

const department = new Department();

module.exports = department;

