// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const battleFieldModel = require("../models/battleFieldModel.js");

////////////////////////////////////////////
//Controller to select total matches
///////////////////////////////////////////
module.exports.retrieveTotalMatch = (req, res, next) => {
    const player_id = res.locals.userId;

    const data = {
        player_id: player_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json();
        }
        else {
            res.locals.player_id = data.player_id;
            res.locals.total_matches = results[0].total_matches;
            next();
        }
    }
    battleFieldModel.retrieveTotalMatch(data ,callback);
}


////////////////////////////////////////////
//Controller to insert total matches
///////////////////////////////////////////
module.exports.updateTotalMatch = (req, res, next) => {
    const data = {
        player_id: res.locals.player_id,
        total_matches : parseInt(res.locals.total_matches) + 1
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            next();
        }
    }
    battleFieldModel.updateTotalMatch(data, callback);
}


////////////////////////////////////////////
//Controller to read all battle Participants
///////////////////////////////////////////
module.exports.randomChampions = (req, res, next) => {
    const userChoice = req.body.value;
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllBattleParticipants:", error);
            res.status(500).json(error);
        }
        else {
            if(userChoice > 35){
                return res.status(404).json({
                    message: "Your selected champion has not been released yet! Try to choose another champion."
                });
            }
            else if(userChoice === null){
                return res.status(400).json({
                    message: "Your input must be integer value"
                });
            }
            else{
                res.locals.userChoiceChampion = results[userChoice].basic_attack;
                res.locals.userChoiceChampionId = results[userChoice].champion_id;
                // console.log("user choice " + results);
                next();
            }
           
        }
    }
    battleFieldModel.randomChampion(callback);
}

////////////////////////////////////////////
//Controller to compare basic attack
///////////////////////////////////////////

module.exports.compareBasicAttack = (req, res, next) => {
    const userFirstChoiceBasicAttack = req.body.basic_attack;
    const data = {
        first_basic_attack: userFirstChoiceBasicAttack,
        second_basic_attack: res.locals.userChoiceChampion
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTeamDetails:", error);
            res.status(500).json(error);
        } else {
            res.locals.winnerChampion = results[0].champion_id;
            next();
        }
    }
    battleFieldModel.compareBasicAttack(data, callback);
}

////////////////////////////////////////////
//Controller to CREATE battle field result
///////////////////////////////////////////
module.exports.postNewBattleFieldResult = (req, res, next) => {
    const player_id = res.locals.userId;
    const userFirstChoiceId = req.body.champion_id;
    const intergerUserFirstChoiceId = parseInt(userFirstChoiceId);
    const data = {
        player_id: player_id,
        first_champion_id: intergerUserFirstChoiceId,
        second_champion_id: res.locals.userChoiceChampionId,
        winner_champion_id: res.locals.winnerChampion
    };

    const creatingBattleField = (error, results) => {
        if (error) {
            console.error("Error createNewChallengeProgress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(results[1]);
        }
    }
    battleFieldModel.insertSingle(data, creatingBattleField);
};


//////////////////////////////////////////////////////
// GET ALL battle field result
//////////////////////////////////////////////////////
module.exports.readAllBattleFieldResults = (req, res, next) =>
{
    const player_id = res.locals.userId;
    const data = {
        player_id: player_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else{
            res.status(200).json(results);
        } 
    }

    battleFieldModel.selectAll(data, callback);
};
