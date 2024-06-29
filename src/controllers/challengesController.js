// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const challengesModel = require("../models/challengesModel.js");

////////////////////////////////////////////
//Controller to read all Challenges
///////////////////////////////////////////
module.exports.readAllChallenges = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChallenges:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    challengesModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select challenge by id
///////////////////////////////////////////

module.exports.readChallengeById = (req, res, next) => {
    const data = {
        challenge_id: req.params.challenge_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readChallengeById:", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected challenges has not been released yet! Try to choose another challenge."
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    challengesModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing challenges
///////////////////////////////////////////
module.exports.checkExistingChallenges = (req, res, next) => {

    const data = {
        challenge_id: req.params.challenge_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallenge:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected challenges has not been released yet! Try to choose another challenge."
                });
            }
            else {
                res.locals.challenge_id = results[0].challenge_id;
                next();
            }
        }
    }
    challengesModel.checkExistingChallenge(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to Read All Players Who Completed Specific Challenges
///////////////////////////////////////////

module.exports.readAllPlayersWhoCompletedChallenges = (req, res, next) => {
    const data = {
        challenge_id: res.locals.challenge_id
    }
    const callback = (error, results, fields) => {

        function player_information(data) {
            let playerInfo = `Players' Completed Challenge List (total of ${data.length} players)\n_______________________________________________________\n\n`;

            data.forEach((player, index) => {
                playerInfo += `${index + 1}. ID number ${player.player_id} called "${player.player_name}" has completed the "${player.challenge_name}" challenge on "${player.completed_on}" and earned ${player.challenge_reward} points.\n\n`;
            });

            return playerInfo;
        }

        if (error) {
            console.error("Error readChallengeById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "No player has done this challenge yet!"
                });
            }
            else {
                res.status(200).send(
                    player_information(results)
                )
            }
        }
    }

    challengesModel.selectByIdToGetPlayers(data, callback);
}

////////////////////////////////////////////
//Controller to CREATE new challenge
///////////////////////////////////////////
module.exports.createNewChallenge = (req, res, next) => {
    if (req.body.challenge_name === undefined || req.body.challenge_description === undefined || req.body.challenge_reward === undefined) {
        res.status(400).json({
            message: `Input Fields (challenge_name, challenge_description, challenge_reward) are required to create a new challenge.`
        });
    } else if (isNaN(req.body.challenge_reward)) {
        res.status(400).json({
            message: `Challenge Reward should be an Integer because it is a point-based rewarding system.`
        });
    } else {
        const data = {
            challenge_name: req.body.challenge_name,
            challenge_description: req.body.challenge_description,
            challenge_reward: req.body.challenge_reward
        };

        const creatingChallenge = (error, results) => {
            if (error) {
                console.error("Error createNewChallenge:", error);
                res.status(500).json(error);
            } else {
                res.status(201).json({
                    message: `A new challenge is created successfully!`,
                    challenge_id: results.insertId,
                    challenge_name: data.challenge_name,
                    challenge_description: data.challenge_description,
                    challenge_reward: data.challenge_reward
                });
            }
        }
        challengesModel.insertSingle(data, creatingChallenge);
    }
};

////////////////////////////////////////////
//Controller to check existing challenges to DELETE
///////////////////////////////////////////
module.exports.checkExistingChallengesToDelete = (req, res, next) => {

    const data = {
        challenge_id: req.params.challenge_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallenge:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen challenge to DELETE is not in the challenge list! Try another challenge_id."
                });
            }
            else {
                res.locals.challenge_id = data.challenge_id;
                next();
            }
        }
    }
    challengesModel.checkExistingChallengeToDelete(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to DELETE Challenge by Id.
///////////////////////////////////////////
module.exports.deleteChallengeById = (req, res, next) => {
    const data = {
        challenge_id: res.locals.challenge_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChallengeById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message: `You successfully deleted the challenge called (Challenge Name : ${results[0][0].challenge_name}.)`
            });
        }
    }
    challengesModel.deleteByIdForChallenges(data, callback);
}

////////////////////////////////////////////
//Controller to check existing challenges to UPDATE
///////////////////////////////////////////
module.exports.checkExistingChallengesIdToUpdate = (req, res, next) => {

    const data = {
        challenge_id: req.params.challenge_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallenge:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen challenge to UPDATE is not in the challenge list! Try another challenge_id."
                });
            }
            else {
                res.locals.challenge_id = data.challenge_id;
                next();
            }
        }
    }
    challengesModel.checkExistingChallengeToUpdate(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to UPDATE Challeges' Information
///////////////////////////////////////////
module.exports.updateChallengesById = (req, res, next) => {

    if (isNaN(req.body.challenge_reward)) {
        res.status(400).json({
            message: `Challenge Reward should be an Integer because it is a point-based rewarding system.`
        });
        return;
    }

    const data = {
        challenge_id: res.locals.challenge_id,
        challenge_name: req.body.challenge_name,
        challenge_description: req.body.challenge_description,
        challenge_reward: req.body.challenge_reward
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateChallengesById:", error);
            res.status(500).json(error);
        } else {
            const storedData = results[1][0];
            res.status(200).json({
                message: `You updated successfully for ID ${data.challenge_id}.`,
                challenge_name: storedData.challenge_name,
                challenge_description: storedData.challenge_description,
                challenge_reward: storedData.challenge_reward
            });
        }
    }
    challengesModel.updateChallengeById(data, callback);
}
