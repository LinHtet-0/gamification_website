// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const playersController = require('../controllers/playersController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/:player_id', playersController.readPlayerById);//endpoint 05
router.get('/', jwtMiddleware.verifyToken,playersController.readAllPlayers);//endpoint 01


router.delete('/:player_id', playersController.deletePlayerById);//endpoint 02

router.post('/', playersController.checkExistingPlayerName, playersController.checkExistingEmail, playersController.createNewPlayer);//endpoint 03

router.put('/updateLostRankPoints', jwtMiddleware.verifyToken, playersController.retrieveCurrentRankPoints, playersController.updateLostRankPoints);//endpoint 04
router.put('/updateRankPoints', jwtMiddleware.verifyToken, playersController.retrieveCurrentRankPoints, playersController.updateRankPoints);//endpoint 04
router.put('/:player_id', playersController.checkExistingPlayers, playersController.checkExistingPlayerNameToUpdate, playersController.checkExistingEmailToUpdate, playersController.checkExistingChampionsToUpdate, playersController.updatePlayerById);//endpoint 04

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;

