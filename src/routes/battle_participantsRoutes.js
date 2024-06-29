// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const battle_participantsController = require('../controllers/battle_participantsController');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////

router.get('/teamDetails/:team_id', battle_participantsController.checkExistingBattleParticipants, battle_participantsController.readTeamDetails);//endpoint 02
router.get('/battleResults/:battle_id', battle_participantsController.readBattleResultsByBattleId);//endpoint 03
router.get('/', battle_participantsController.readAllBattleParticipants);//endpoint 01


////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;