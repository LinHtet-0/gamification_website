// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require 
///////////////////////////////////////////
const express = require('express');
const messageController = require('../controllers/messageController.js');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


////////////////////////////////////////////
//Express Router
///////////////////////////////////////////
const router = express.Router();


////////////////////////////////////////////
//API endpoints
///////////////////////////////////////////
router.get('/', jwtMiddleware.verifyToken, messageController.readAllMessages);//endpoint 01
router.post('/', jwtMiddleware.verifyToken, messageController.sendMessages);//endpoint 02
router.delete('/:message_id', messageController.deleteMessages);//endpoint 03
router.put('/:message_id', messageController.updateMessageById);//endpoint 04

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;