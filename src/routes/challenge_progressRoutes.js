// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const challenge_progressController = require('../controllers/challenge_progressController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();



////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/players/:player_id/completed-challenge', challenge_progressController.readChallengeByPlayerId);//endpoint 02
router.get('/', challenge_progressController.readAllChallengesDoneByPlayers);//endpoint 01

router.delete('/players/:player_id/challenges/:challenge_id',challenge_progressController.checkExistingPlayerToDelete, challenge_progressController.checkExistingChallengeToDelete, challenge_progressController.deleteChallengeProgressById);//endpoint 03

router.post('/challenges/:challenge_id', jwtMiddleware.verifyToken,challenge_progressController.checkExistingPlayerToCreate, challenge_progressController.checkExistingChallengeToCreate, challenge_progressController.checkExistingProgress, challenge_progressController.createNewChallengeProgress);//endpoint 04

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;