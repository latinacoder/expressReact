//import dependencies
const express = require('express'); //express is the backend web framework for generating a web server
const cors = require('cors'); //cors is the middleware to make sure we don't get cors error when our react app makes a request to our express app

//import JSON files
const projects = require('./projects.json');
const about = require('./about.json');

//create our app object
const app = express();

//set up middleware
app.use(cors());

//home route for testing our app
app.get('/', (req, res) => {
  res.send('Hello World');
});

//route for retrieving projects
app.get('/projects', (req, res) => {
  //send projects via JSON
  res.json(projects);
});

//route for retrieving about info
app.get('/about', (req, res) => {
  //send about via JSON
  res.json(about);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

//turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

