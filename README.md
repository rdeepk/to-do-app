## Todo Application

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This application is written using Reactjs, Node.js, Express and MongoDB.

This is a minimal version of the Todo application allowing users to add:
- Tasks
- Projects
- Labels
- Status

Basic functionality is:

- Display all Tasks by default.
- Filter tasks by Project.
- Functionality to add new todos.
- Ability to edit existing todos.
- Delete existing todos.
- One click clear for all completed tasks.
- Displays the total, active and completed tasks statistics.
- Filter the tasks by status.
- Display and add new projects.
- Display and add labels.


##Installing

A step by step series of examples that tell you have to get a development env running:

1. Clone the repo
git clone git@github.com:rdeepk/react-to-do-list-app.git

2. Install mongodb and run mongo server
[MongoDB](https://docs.mongodb.com/manual/installation/)

3. Move into the main folder and install dependencies:
npm i

4. Move into the server folder and run nodemon:
- cd src/server
- nodemon server.js

5. To run client, go to root folder and run
- npm start

And thats it!! Hopefully it will run on port 3000.

Built With

- [MERN](http://mern.io/) - Combination of Javascript technologies used to develop fullstack web applications

- [npm](https://www.npmjs.com/) - Package manager for JavaScript

Front-end

- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

- [Bootstrap](http://getbootstrap.com/) - The most popular front-end framework.

Back-end

- [Nodemon](https://nodemon.io/) - Auto-refresh the server on code change

- [Mongoose](http://mongoosejs.com/) - Mongodb object modeling for Node.js


To run it successfully , first add new projects and labels, so that they are accessible when adding new tasks.