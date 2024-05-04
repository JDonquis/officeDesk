const db = require('./Database.js')
const bcrypt = require("bcrypt");

class User
{
	async login($request)
	{
		 const { username, password } = $request;	

		 const sql = "SELECT * FROM users WHERE username=?";

		 return new Promise((resolve,reject) => 
		 {

		 	db.query(sql, [username], (error, results, fields) => 
		 	{
			    if(error)
			    	reject({code:500, data:null, message:'Algo ha salido mal, contacte con el desarrollador', errorMessage:error.message});
			
			
			    if(results.length > 0)
			    {	
			    	bcrypt.compare(password, results[0].password, (err, isMatch) =>
			    	{
			    		if(err)
			    			resolve({code:400, data:null, message:'Datos incorrectos', errorMessage:null});

			    		else if(isMatch)
			       			resolve({code:200, data:results[0], message:'Logeado Correctamente', errorMessage:null});

			       		else
			    			resolve({code:400, data:null, message:'Datos incorrectos', errorMessage:null});


			    	})
			    }
			    else
			       	resolve({code:400, data:null, message:'Datos incorrectos', errorMessage:null})
		    
		    });

		 })
	
		

		 
	}

}

const user = new User();

module.exports = user;

