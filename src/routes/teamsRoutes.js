// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const teamsController = require('../controllers/teamsController');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/playerDetails-inTeam/:teamName/players/:player_id', teamsController.checkTeamName, teamsController.readPlayerDetailById);//endpoint 06
router.get('/team-name/:teamName', teamsController.readAllParticipantsByTeamName);//endpoint 01
router.get('/:team_id', teamsController.readByTeamId)//endpoint 03
router.get('/', teamsController.readAllTeams);//endpoint 02

router.delete('/:team_id', teamsController.deleteTeamsById);//endpoint 04

router.post('/', teamsController.createNewTeams);//endpoint 05
////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;