// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const battleFieldController = require('../controllers/battleFieldController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////

router.post('/', jwtMiddleware.verifyToken, battleFieldController.retrieveTotalMatch, battleFieldController.updateTotalMatch ,battleFieldController.randomChampions, battleFieldController.compareBasicAttack, battleFieldController.postNewBattleFieldResult);//endpoint 02

router.get('/', jwtMiddleware.verifyToken, battleFieldController.readAllBattleFieldResults);//endpoint 01


////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;