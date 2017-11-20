import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// const status = [
//     {
//         id: 100,
//         title: 'Active'
//     },
//     {
//         id: 101,
//         title: 'Complete'
//     },
//     {
//         id: 102,
//         title: 'Not Started'
//     }
// ];

// const todos = [
//     {
//         id: 1001,
//         title: 'Learn angular',
//         description:'Want to learn angular',
//         status:102,
//         project:201,
//         labels:[
//             {id: 5001, ischecked:true},
//             {id: 5002, ischecked:false},
//             {id: 5003, ischecked:false},
//             {id: 5004, ischecked:false},
//             {id: 5005, ischecked:true}
//         ]
//     },
//     {
//         id: 1002,
//         title: 'Write the content for the next module',
//         description:'Needed completion',
//         status:'101',
//         project:201,
//         labels:[
//             {id: 5001, ischecked:true},
//             {id: 5002, ischecked:false},
//             {id: 5003, ischecked:true},
//             {id: 5004, ischecked:true},
//             {id: 5005, ischecked:false}
//         ]
//     },
//     {
//         id: 1003,
//         title: 'Buy cheese',
//         description:'For dinner on weekend',
//         status:102,
//         project:202,
//         labels:[
//             {id: 5001, ischecked:false},
//             {id: 5002, ischecked:true},
//             {id: 5003, ischecked:false},
//             {id: 5004, ischecked:false},
//             {id: 5005, ischecked:false}
//         ]
//     },
//     {
//         id: 1004,
//         title: 'Buy milk',
//         description:'Milk is important',
//         status:102,
//         project:202,
//         labels:[
//             {id: 5001, ischecked:false},
//             {id: 5002, ischecked:true},
//             {id: 5003, ischecked:false},
//             {id: 5004, ischecked:false},
//             {id: 5005, ischecked:false}
//         ]
//     },
//     {
//         id: 1005,
//         title: 'Complete Todo App',
//         description:'Assignment for current week',
//         status:100,
//         project:201,
//         labels:[
//             {id: 5001, ischecked:true},
//             {id: 5002, ischecked:false},
//             {id: 5003, ischecked:true},
//             {id: 5004, ischecked:true},
//             {id: 5005, ischecked:false}
//         ]
//     }
// ];

// const projects = [
//     {
//         id: 201,
//         title: 'Web Dev'
//     },
//     {
//         id: 202,
//         title: 'Personal'
//     },
//     {
//         id: 203,
//         title: 'Health'
//     }

// ];

// const labels = [
//     {
//         id: 5001,
//         title:'front-end'
//     },
//     {
//         id: 5002,
//         title:'shopping'
//     },
//     {
//         id: 5003,
//         title:'urgent'
//     },
//     {
//         id: 5004,
//         title:'web-dev'
//     },
//     {
//         id: 5005,
//         title:'fitness'
//     }

// ];
ReactDOM.render(
                <Router>
                <App    
                // todos={todos}
                //         status={status}
                //         projects={projects}
                //         labels={labels}
                />
                </Router>, document.getElementById('tasks'));
registerServiceWorker();
    