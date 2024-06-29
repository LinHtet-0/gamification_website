// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const championsController = require('../controllers/championsController.js');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/:champion_id', championsController.readChampionById);//endpoint 02
router.get('/', championsController.readAllChampions);//endpoint 01

router.delete('/:champion_id', championsController.checkExistingChampionsToDelete, championsController.deleteChampionById);//endpoint 03

router.post('/', championsController.checkForRequireData, championsController.checkExistingChampionsAbilitiesAndNameToCreate, championsController.createNewChampion);//endpoint 05

router.put('/:champion_id', championsController.checkExistingChampionsIdToUpdate, championsController.updateChampionsById);//endpoint 04


////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;