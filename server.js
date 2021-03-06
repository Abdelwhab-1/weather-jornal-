// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express"); 
// Start up an instance of app
const app = express(); 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors()); 
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000; 

/* 
router and the routes 
*/
const router = express.Router(); 
router.route("/temperature")
.get(graptemperature)
.post(entertemp); 
app.use(router)

/* the logic functionns */

function graptemperature(request,response){
    response.send(projectData);
}




function entertemp(request,response){
    const holder = request.body; 

    projectData[holder["zip"]] = holder ; 
    response.sendStatus(201); 
}


// start listening to a port 
app.listen(port , ()=>{
});
