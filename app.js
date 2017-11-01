// dependencies
const express = require('express'),
      bodyParser = require('body-parser');

// initialize app
const app = express();

// initialize middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// port 
const port = process.env.PORT || 3000;

// routes
app.get('/:timeStamp', (req, res)=>{

  let isNumber = parseInt(req.params.timeStamp);

  if(isNumber){
  	 // requested format is unix 
  	 let unix = req.params.timeStamp;
  	 let natural = new Date(isNumber).toDateString();



  	 // check is date is valid one
  	if(natural === "Invalid Date"){
       
       let errData = {
       	unix :null,
       	natural :null

       }

       return res.json(errData);
  	}


  	 // construct a data
  	 let data = {
  	 	unix : unix,
  	 	natural : natural
  	 }

  	 // send the response
  	 return res.json(data);

  } else {
  	// requested format is not a number

  	let natural = new Date(req.params.timeStamp).toDateString();

  	// check is date is valid one
  	if(natural === "Invalid Date"){
       
       let errData = {
       	unix :null,
       	natural :null

       }

       return res.json(errData);
  	}

  	let unix = new Date(req.params.timeStamp).getTime();
    
   

    // construct a data
  	 let data = {
  	 	unix : unix,
  	 	natural : natural
  	 }


  	 return res.json(data);


  }
 

	
	
})

app.get('/', (req,res)=>{
	let data ={
		msg:"give time as a parameter(either in natural lang format (example: January 1, 2016) or UNIX EPOCH format (1450137600)"
	}

	res.json(data);
})

// fallback routes
app.get('*', (req, res)=>{
	let data = {
		msg:"this is not a valid api"
	}

	res.json(data);
})

app.post('*', (req,res)=>{
	let data ={
		msg: "you are not allowed to post anything here"
	}
})


// listen 
app.listen(port, ()=>console.log(`server listening on the port ${port}`));