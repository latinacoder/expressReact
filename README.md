# Express and React Lab
During this lab we will be creating a full stack portfolio page using Express and React to see how you can create a full stack project using a simple API build with express and a frontend application with React.

- [Here is a Repo with a final version for reference](https://git.generalassemb.ly/AlexMerced/Express-React-Portfolio-Reference-Code/tree/router64)

**NOTE** While the above repo has the backend and frontend folder in one repo, to deploy the backend and frontend project MUST be in separate repos, follow the direction carefully regarding where repos are created and deployment.

**ANOTHER NOTE** This is **not your actual portfolio**, so don't worry about making it perfect. Use this as an exercise to practice the skills we've learned in the class so far.

## **Setup**

- Fork and clone the repository
- Inside this folder create a folder for our backend app called `backend`this will house our express application
- Then we will generate a react project for a our frontend. The command should be run from `express_react_lab` so make sure your terminal is in that folder ...
    - `npx create-react-app frontend --skip-git`
- The end result should be the following folder structure

```jsx
- /express_react_lab
  > /backend
  > /frontend
```

## **Express app setup**

- Open up your terminal inside the backend folder
- touch `server.js` `.gitignore`
- include node_modules folder in .`gitignore`

```
node_modules
```

- create a new npm project with the command `npm init -y`
- install the following
    - `npm install express cors`
    - `npm install --save-dev nodemon`

### **What we installed**

1. express: The backend web framework for generating a web server
2. cors: middleware to make sure we don't get cors errors when our react app makes a request to our express app
3. nodemon: development tool to auto restart our server whenever
4. update the `package.json`with the following scripts

```jsx
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
```

### **Our Data**

Instead of using a database we will use JSON files to store the data for our project for now.

Run the following command in the `backend`folder to create our files

- `touch projects.json about.json`

### **projects.json**

In this file you should use the below example but replace it with your projects from the previous units. (json files don't need to be exported, node knows how to read them).

Essentially this file is an array of objects that represent your projects.

```jsx
[
  {
    "name": "project1",
    "live": "https://app.herokuapp.com/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  },
  {
    "name": "project2",
    "live": "https://app.netlify.app/whatever",
    "git": "http://www.github.com/username/reponame",
    "image": "http://www.imgur.com/pictureofproject.png"
  }
]
```

### **about.json**

This file will be one big option with information about you to use in your portfolio.

```jsx
{
  "name": "Bob Smith",
  "email": "Bob@BobSmith.dev",
  "headshot": "http://www.imgur.com/pictureofproject.png",
  "bio": "Bob Smith graduated from General Assembly in 2017. Afterwords, he went to work for XYZ Technologies where he maintained a full stack application using Meteor and Ember. He also recently started started learning Prolog, cause why not waste time."
}
```

### **server.js**

Now we can make our server, here is the overview of what we will do.

- import our dependencies and json files
- create our app object
- add our cors middleware
- create a home route to test our app
- create a `/projects`route to retrieve our projects
- create a `/about`route to retrieve our about info
- setup our server listener

```jsx
// Import Dependencies
const express = require("express");
const cors = require("cors");

// Import JSON files
const projects = require("./projects.json");
const about = require("./about.json");

// Create our app object
const app = express();

// set up middleware
app.use(cors());

//home route for testing our app
app.get("/", (req, res) => {
  res.send("Hello World");
});

// route for retrieving projects
app.get("/projects", (req, res) => {
  // send projects via JSON
  res.json(projects);
});

// route for retrieving about info
app.get("/about", (req, res) => {
  // send projects via JSON
  res.json(about);
});

//declare a variable for our port number
const PORT = process.env.PORT || 4000;

// turn on the server listener
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

- run your server `npm run dev`
- go to `localhost:4000`and make sure you see "hello world"
- go to `localhost:4000/projects`and make sure you see your projects as JSON
- go to `localhost:4000/about`and make sure you see your about info as json
- Our Backend is complete

## Connect backend to Github

### **Creating the git repo**

- make sure your terminal is inside the "backend" folder
- create a new git repo `git init`
- add all files to staging `git add .`
- commit the files `git commit -m "backend is done"`
- create a new EMPTY repo on github.com and get the remote url
- connect the remote to your local repo `git remote add origin URL`, make sure to replace "URL" with the URL of your github.com repo
- push up your changes `git push origin BRANCH`make sure to replace "BRANCH" with your current branch name which can be retrieved by running `git branch`

## **Building the Frontend**

Make sure to keep your Heroku url handy, we'll need it in a moment.

- open your terminal to the `frontend`folder
- install react router `npm install react-router-dom`

## **Setting up React Router**

open up `src/index.js`and make the following changes

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## **Getting things scoped out**

- create a `src/components`folder and `src/pages`folder
- in components create `Header.js`and `Footer.js`

`src/components/Header.js`

```jsx
function Header(props) {
  return <h1>Header</h1>;
}

export default Header;
```

`src/components/Footer.js`

```jsx
function Footer(props) {
  return <h1>Footer</h1>;
}

export default Footer;
```

- In `src/pages`create `Home.js`, `About.js`and `Projects.js`

`src/pages/Home.js`

```jsx
function Home(props) {
  return <h1>Home</h1>;
}

export default Home;
```

`src/pages/About.js`

```jsx
function About(props) {
  return <h1>About</h1>;
}

export default About;
```

`src/pages/Projects.js`

```jsx
function Projects(props) {
  return <h1>Projects</h1>;
}

export default Projects;
```

## **App.js**

Now in our App component, import the newly created React components and set up routes

`src/App.js`

```jsx
//Import route and our components
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
 

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About about={aboutInfo}/>} />
        <Route path="/projects" element={<Projects projects={projects}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
```

## **The Navigation**

Right now we can't switch between our routes with Link components, so let's build our navigation so we can switch between pages. Our navigation should be in our header.

`src/components/Header.js`

```jsx
import { Link } from "react-router-dom";

function Header(props) {
  //inline style for the nav tag
  const navStyle = {
    display: "flex",
    justifyContent: "space-around",
    border: "3px solid black",
    padding: "8px",
    width: "90%",
    margin: "auto",
  };

  return (
    <header>
      <h1>My Portfolio Page</h1>
      <nav style={navStyle}>
        <Link to="/">
          <div>HOME</div>
        </Link>
        <Link to="/about">
          <div>ABOUT</div>
        </Link>
        <Link to="/projects">
          <div>PROJECTS</div>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
```

You should be able to navigate between our pages but they are only one word at the moment. Let's populate our projects and about pages.

## Set up API calls to backend

We will do the following...

Create functions that will call our /projects and /about routes from the backend to get the data from our API. Let's create `src/apiCalls.js`.

```jsx
// BASE URL OF OUR LOCAL API
const URL = "http://localhost:4000"

export const projectsLoader = async () => {
    const response = await fetch(URL + "/projects")
    const projects = await response.json()
    return projects
}

export const aboutLoader = async () => {
    const response = await fetch(URL + "/about")
    const about = await response.json()
    return about
}
```

Let's import these functions into App.js and import useState and useEffect in order to make use of them

`src/App.js`

```jsx
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { aboutLoader, projectsLoader } from "./apiCalls";

function App() {
 
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
```

Now let’s create two useEffect functions in order to make the API calls when the component mounts.

- set up state for the about and projects data
- create useEffect hooks to call the API functions and set the state data

`src/App.js`

```jsx
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { aboutLoader, projectsLoader } from "./apiCalls";

function App() {
  const [aboutInfo, setAboutInfo] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutLoader();
        setAboutInfo(data);
      } catch (error) {
        console.log(error);
      }
    };   
		fetchAbout();
  }, []);

  useEffect(()=> {
    const fetchProjects = async () => {
      try {
        const data = await projectsLoader();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
   
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
```

Check to make sure the state updated correctly by looking in your React Dev Tools

## Pass data to components

Now pass the state variables as props to the components using them

Then, add a conditional to make sure the API data is loaded before the aboutInfo and projects variables are referenced

`src/App.js`

```jsx
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import { aboutLoader, projectsLoader } from "./apiCalls";

function App() {
  const [aboutInfo, setAboutInfo] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutLoader();
        setAboutInfo(data);
      } catch (error) {
        console.log(error);
      }
    };   
		fetchAbout();
  }, []);

  useEffect(()=> {
    const fetchProjects = async () => {
      try {
        const data = await projectsLoader();
        setProjects(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
   
  }, [])

  if (!projects || !aboutInfo) {
    return (<h1>Loading...</h1>)
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About about={aboutInfo}/>} />
        <Route path="/projects" element={<Projects projects={projects}/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
```

## About page

Now we can display the data in the About component

`src/pages/About.js`

```jsx
function About({ about }) {
  return (
    <div>
      <h2>{about.name}</h2>
      <h3>{about.email}</h3>
      <p>{about.bio}</p>
    </div>
  );
}

export default About;
```

## **Projects**

Now we can also display the data in the Projects component

`src/pages/Projects.js`

```jsx
function Projects({ projects }) {
  return projects.map((project) => (
    <div>
      <h1>{project.name}</h1>
      <img src={project.image} alt={project.name} />
      <a href={project.git}>
        <button>Github</button>
      </a>
      <a href={project.live}>
        <button>live site</button>
      </a>
    </div>
  ));
}

export default Projects;
```

****What Now?****
• Add some content to the home page
• Spend some time styling your frontend
• Add content to the footer
• add all files to staging `git add .`
• commit `git commit -m "frontend complete"`
• push up the code `git push origin BRANCH`make sure to replace BRANCH with your active branch, you can confirm what it is with the command `git branch`

****Hungry For More
Styling Challenges (choose 1)****
• Style using the Styled Components Library `npm install styled-components`
• Style using sass `npm install sass`(after install change the extension on your css files scss)
• Try using `bulma-react-components`a [library of components pre-made using Bulma](https://www.npmjs.com/package/react-bulma-components)

## **BONUS!!!**

## **Deploy Backend**

[Due to End of Herokus Free Tier: Good Alternatives are Render or Railway, this video will show you how to deploy to these services](https://www.youtube.com/watch?v=YhOGojgR3O4)

## **Deploy Frontend**

Once everything seems working, do the following.

- create a file called `netlify.toml`in the `frontend`folder with the following

```jsx
[[redirects]]
  from = "/*"
  to = "/index.html"
```

• head over to netlify and create a new project based on your frontend repo, it should auto detect the build command and deploy.
• if you run into any issues refer to this [guide for deployment](https://tuts.alexmercedcoder.com/2021/1/deployreact/)
• You've deployed your portfolio!!!

****Express Challenges****
• Try adding a form to your React project and a post route on your express app to go with it
• Convert from JSON files to using a mongo database for your project (not really necessary for the about info)
