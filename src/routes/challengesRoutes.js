// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const challengesController = require('../controllers/challengesController');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/:challenge_id/completed-players', challengesController.checkExistingChallenges, challengesController.readAllPlayersWhoCompletedChallenges);//endpoint 03
router.get('/:challenge_id', challengesController.readChallengeById);//endpoint 02
router.get('/', challengesController.readAllChallenges);//endpoint 01

router.delete('/:challenge_id', challengesController.checkExistingChallengesToDelete, challengesController.deleteChallengeById);//endpoint 05

router.post('/', challengesController.createNewChallenge);//endpoint 04

router.put('/:challenge_id', challengesController.checkExistingChallengesIdToUpdate, challengesController.updateChallengesById);//endpoint 06


////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;