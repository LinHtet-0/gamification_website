// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const battlesModel = require("../models/battlesModel.js");

////////////////////////////////////////////
//Controller to read all Battles
///////////////////////////////////////////
module.exports.readAllBattles = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllBattles:", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json(results);
        }
    }
    battlesModel.selectAll(callback);
}


////////////////////////////////////////////
//Controller to check existing challenges to CREATE
///////////////////////////////////////////
module.exports.checkExistingTeamBattleToCreate = (req, res, next) => {

    const data = {
        team_one: req.body.winner_team_id,
        team_two: req.body.loser_team_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingChampion:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `There is no battles related to your chosen two teams id ${data.team_one} and id ${data.team_two}.`
                });
            }
            else {
                res.locals.team_one = data.team_one;
                res.locals.team_two = data.team_two;
                next();
            }
        }
    }
    battlesModel.checkExistingTeamBattleToCreate(data, callback)
}


////////////////////////////////////////////
//Controller to CREATE New Battle Results
///////////////////////////////////////////
module.exports.createNewBattleResults = (req, res, next) => {

    const data = {
        winner_team_id: res.locals.team_one,
        loser_team_id: res.locals.team_two
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewChampions:", error);
            res.status(500).json(error);
        } else {
            let lastestMatch = results[1];
            res.status(200).json({
                message: `A new battle results of team ${data.winner_team_id} and ${data.loser_team_id}`,
                start_time: results[1][lastestMatch.length - 1].start_time,
                end_time: results[1][lastestMatch.length - 1].end_time,
                winner_team_id: results[1][lastestMatch.length - 1].winner_team_id,
                loser_team_id: results[1][lastestMatch.length - 1].loser_team_id
            });
        }
    }
    battlesModel.insertSingle(data, callback);
}
