// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const battle_participantsModel = require("../models/battle_participantsModel.js");

////////////////////////////////////////////
//Controller to read all battle Participants
///////////////////////////////////////////
module.exports.readAllBattleParticipants = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllBattleParticipants:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    battle_participantsModel.selectAll(callback);
}


////////////////////////////////////////////
//Controller to check existing teams in battle participant
///////////////////////////////////////////
module.exports.checkExistingBattleParticipants= (req, res, next) => {

    const data = {
        team_one: req.params.team_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingChallenge:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message:  `Don't have any battle records related to that id ${data.team_one}.`
                });
            }
            else {
                res.locals.team_id = data.team_one;
                next();
            }
        }
    }
    battle_participantsModel.checkExistingBattleParticipants(data, callback)
}

////////////////////////////////////////////
//Controller to select teamDetail by id
///////////////////////////////////////////

module.exports.readTeamDetails = (req, res, next) => {
    const data = {
        team_one: res.locals.team_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTeamDetails:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results[0]);
        }
    }
    battle_participantsModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to select battler results by id
///////////////////////////////////////////

module.exports.readBattleResultsByBattleId = (req, res, next) => {
    const data = {
        battle_id: req.params.battle_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readChampionById:", error);
            res.status(500).json(error);
        } else {

            if (results[0].length == 0) {
                res.status(404).json({
                    message: `Your selected battle id ${data.battle_id} is not found as a part of battle participant!`
                });
            }
            else res.status(200).json(results[1][0]);
        }
    }
    battle_participantsModel.selectByIdToGetBattleResults(data, callback);
}