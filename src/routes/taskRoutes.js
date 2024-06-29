// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg



////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const taskController = require('../controllers/taskController');


////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router(); 

////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.post('/', taskController.createNewTask);//Endpoint 06

router.get('/:task_id', taskController.readTaskById);//Endpoint 08
router.get('/', taskController.readAllTask);//Endpoint 07

router.put('/:task_id', taskController.updateTaskById);//Endpoint 09

router.delete('/:task_id', taskController.deleteTaskById);//Endpoint 10

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;