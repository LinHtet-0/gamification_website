// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const playerUserRelModel = require("../models/playerUserRelModel.js");

////////////////////////////////////////////
//Controller to CREATE new playerUserRel
///////////////////////////////////////////
module.exports.insertUserPlayerId = (req, res, next) => {
    const data = {
        player_id : res.locals.player_id,
        user_id: res.locals.userId,
    };

    const creatingChallenge = (error, results) => {
        if (error) {
            console.error("Error createNewChallengeProgress:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }
    playerUserRelModel.insertUserPlayerId(data, creatingChallenge);
};