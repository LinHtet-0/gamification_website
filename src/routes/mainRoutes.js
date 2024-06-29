// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Require Routers
///////////////////////////////////////////
const express = require('express');
const userRoutes = require('./userRoutes.js');
const taskRoutes = require('./taskRoutes.js');
const taskProgressRoutes = require('./taskProgressRoutes.js');
const playersRoutes = require('./playersRoutes.js');
const messageRoutes = require('./messageRoutes.js');
const challengesRoutes = require('./challengesRoutes.js');
const battleFieldRoutes = require('./battleFieldRoutes.js');
const challenge_progressRoutes = require('./challenge_progressRoutes.js');
const championsRoutes = require('./championsRoutes.js');
const picked_championRoutes = require('./picked_championRoutes.js');
const teamsRoutes = require('./teamsRoutes.js');
const battle_participantsRoutes = require('./battle_participantsRoutes.js');
const battlesRoutes = require('./battlesRoutes.js');
const playerUserRelController= require('../controllers/playerUserRelController.js');
const userController = require('../controllers/userController');
const playerController = require('../controllers/playersController');
const exampleController = require('../controllers/exampleController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');


////////////////////////////////////////////
//Router
///////////////////////////////////////////
const router = express.Router();
const challenge_progressController = require('../controllers/challenge_progressController');

////////////////////////////////////////////
//Used Routers
///////////////////////////////////////////
router.use("/battleFields", battleFieldRoutes);
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);
router.use("/task_progress", taskProgressRoutes);
router.use("/players", playersRoutes);
router.use("/challenges", challengesRoutes);
router.use("/challenge_progress", challenge_progressRoutes);
router.use("/champions", championsRoutes);
router.use("/picked_champion", picked_championRoutes);
router.use("/teams", teamsRoutes);
router.use("/battle_participants", battle_participantsRoutes);
router.use("/battles", battlesRoutes);
router.use("/messages", messageRoutes);

router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, playerController.insertPlayerData, playerUserRelController.insertUserPlayerId, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.get('/profile', jwtMiddleware.verifyToken, challenge_progressController.readChallengeByPlayerId);//endpoint 06
router.post("/jwt/generate", exampleController.preTokenGenerate, jwtMiddleware.generateToken, exampleController.beforeSendToken, jwtMiddleware.sendToken);
router.get("/jwt/verify", jwtMiddleware.verifyToken, exampleController.showTokenVerified);
router.post("/bcrypt/compare", exampleController.preCompare, bcryptMiddleware.comparePassword, exampleController.showCompareSuccess);
router.post("/bcrypt/hash", bcryptMiddleware.hashPassword, exampleController.showHashing);

////////////////////////////////////////////
//Export Routers
///////////////////////////////////////////
module.exports = router;


