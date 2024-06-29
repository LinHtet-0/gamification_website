// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const taskProgressController = require('../controllers/taskProgressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.post('/tasks/:task_id', jwtMiddleware.verifyToken,taskProgressController.checkExistingPlayerToCreate, taskProgressController.checkExistingTaskToCreate, taskProgressController.createNewTaskProgresses);//endpoint 06
router.post('/', taskProgressController.checkUserIdAndTaskId, taskProgressController.createNewTaskProgress);//Endpoint 11

router.get('/:progress_id', taskProgressController.readTaskProgressById);//Endpoint 12

router.put('/:progress_id', taskProgressController.updateTaskProgressById);//Endpoint 13

router.delete('/:progress_id', taskProgressController.deleteTaskProgressById);//Endpoint 14

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;