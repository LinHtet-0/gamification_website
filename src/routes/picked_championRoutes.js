// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const picked_championController = require('../controllers/picked_championController.js');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/:player_id/pickedChampionDetail', picked_championController.readChampionsPlayedByPlayers);//endpoint 02
router.get('/', picked_championController.readAllChampionPickedByPlayers);//endpoint 01

router.delete('/:player_id/champion/:champion_id', picked_championController.checkExistingPlayerToDelete, picked_championController.checkExistingChampionToDelete, picked_championController.deletePlayerAndChampionById);//endpoint 03

router.post('/', picked_championController.checkExistingPlayerToCreate, picked_championController.checkExistingChampionToCreate, picked_championController.createNewPickedChampion);//endpoint 04

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;