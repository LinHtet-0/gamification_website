// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const challenge_progressModel = require("../models/challenge_progressModel.js");


////////////////////////////////////////////
//Controller to read all Challenges Done By Players
///////////////////////////////////////////
module.exports.readAllChallengesDoneByPlayers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChallenges:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    challenge_progressModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select challenge by Player Id
///////////////////////////////////////////

module.exports.readChallengeByPlayerId = (req, res, next) => {
    const userId = res.locals.userId;
    const data = {
        player_id: userId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readChallengeByPlayerId", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected Player where Id "${data.player_id} has not completed any single challenge."`
                });
            }
            else {
                res.status(200).json(results);
            }
        }
    }
    challenge_progressModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing players
///////////////////////////////////////////
module.exports.checkExistingPlayerToCreate = (req, res, next) => {

    const playerId =res.locals.userId;
        
    const data = {
        player_id: playerId
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error .checkExistingPlayerToCreate:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected players (id : ${data.player_id} ) not found!`
                });
            }
            else {
                res.locals.player_id = data.player_id;
                res.locals.player_experience_points = results[0].experience_points;
                next();
            }
        }
    }
    challenge_progressModel.checkExistingPlayerToCreate(data, callback)
}

////////////////////////////////////////////
//Controller to check existing challenges
///////////////////////////////////////////
module.exports.checkExistingChallengeToCreate = (req, res, next) => {

    const data = {
        challenge_id: req.params.challenge_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallengeToCreate:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected challenges has not been released yet! Try to choose another challenge."
                });
            }
            else {
                res.locals.challenge_id = data.challenge_id;
                res.locals.challenge_name = results[0].challenge_name;
                res.locals.challenge_reward = results[0].challenge_reward
                next();
            }
        }
    }
    challenge_progressModel.checkExistingChallengeToCreate(data, callback)
}

////////////////////////////////////////////
//Controller to check existing progtess
///////////////////////////////////////////
module.exports.checkExistingProgress = (req, res, next) => {

    const data = {
        player_id : res.locals.player_id,
        challenge_id: req.params.challenge_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallengeToCreate:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length > 0) {
                return res.status(200).json(results);
            }
            else if(results.length == 0) {
                next();
            }
        }
    }
    challenge_progressModel.checkExistingProgressToCreate(data, callback)
}

////////////////////////////////////////////
//Controller to CREATE new challenge progress
///////////////////////////////////////////
module.exports.createNewChallengeProgress = (req, res, next) => {
    const data = {
        player_id : res.locals.player_id,
        challenge_id: res.locals.challenge_id,
        challenge_name: res.locals.challenge_name,
        experience_points: res.locals.challenge_reward + res.locals.player_experience_points
    };

    const creatingChallenge = (error, results) => {
        if (error) {
            console.error("Error createNewChallengeProgress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(
                [data.challenge_id, data.experience_points,data.challenge_name, res.locals.challenge_reward]
            );
        }
    }
    challenge_progressModel.insertSingle(data, creatingChallenge);

};

////////////////////////////////////////////
//Controller to check existing players
///////////////////////////////////////////
module.exports.checkExistingPlayerToDelete = (req, res, next) => {

    const data = {
        player_id: req.params.player_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallengeToCreate:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected players (id : ${data.player_id}) not found!`
                });
            }
            else {
                console.log(results);
                res.locals.player_id = data.player_id
                next();
            }
        }
    }
    challenge_progressModel.checkExistingPlayerToDelete(data, callback)
}



////////////////////////////////////////////
//Controller to check existing challenges
///////////////////////////////////////////
module.exports.checkExistingChallengeToDelete = (req, res, next) => {
 
    const data = {
        player_id : res.locals.player_id,
        challenge_id: req.params.challenge_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error .checkExistingPlayerToCreate:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected players (id : ${data.player_id}) not completed this challenge yet!`
                });
            }
            else {
                res.locals.challenge_id = data.challenge_id;
                res.locals.player_experience_points = results[0].experience_points;
                next();
            }
        }
    }
    challenge_progressModel.checkExistingChallengeToDelete(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to DELETE challenge progress data
///////////////////////////////////////////
module.exports.deleteChallengeProgressById= (req, res, next) => {
    const data = {
        player_id : res.locals.player_id,
        challenge_id: res.locals.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChallengeProgressById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message: `You successfully deleted the challenge called (Challenge ID : ${data.challenge_id}) completed by (Player Name : ${results[0][0].player_name}))`
            });
        }
    }
    challenge_progressModel.deleteChallengeProgressById(data, callback);
}


