// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const picked_championModel = require("../models/picked_championModel.js");

////////////////////////////////////////////
//Controller to read all Champions picked by players
///////////////////////////////////////////
module.exports.readAllChampionPickedByPlayers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChampionPickedByPlayers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    picked_championModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select champion by id
///////////////////////////////////////////

module.exports.readChampionsPlayedByPlayers = (req, res, next) => {
    const data = {
        player_id: req.params.player_id
    }
    const callback = (error, results, fields) => {
        function championPlayed(data) {
            let playedChampionData = data[0][0];
            let totalBattles = data[1][0];
            let playerInfo = `"${playedChampionData.player_name}" played "${totalBattles.count}" battles in total by using these following champions.\n`;
            data[0].forEach((champion, index) => {
                playerInfo += `\n${index+1}. ${champion.champion_name} (Champion Type : ${champion.champion_type}) \n`
            })
            return playerInfo;
        }

        if (error) {
            console.error("Error readChallengeById:", error);
            res.status(500).json(error);
        } else {

            if (results[0].length == 0) {
                res.status(404).json({
                    message: "This player has not played any champions before!"
                });
            }
            else {
                console.log(results);
                res.status(200).send(championPlayed(results));
            }
        }
    }
    picked_championModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing players
///////////////////////////////////////////
module.exports.checkExistingPlayerToDelete = (req, res, next) => {

    const data = {
        player_id: req.params.player_id
    }

    const validate_player = (error, results) => {
        if (error) {
            console.log("Error checkExistingPlayer:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected player is not found!"
                });
            }
            else {
                res.locals.player_id = data.player_id;
                next();
            }
        }
    }
    picked_championModel.checkExistingPlayerToDelete(data, validate_player)
}

////////////////////////////////////////////
//Controller to check existing champion
///////////////////////////////////////////
module.exports.checkExistingChampionToDelete = (req, res, next) => {

    const data = {
        player_id: res.locals.player_id,
        champion_id: req.params.champion_id
    }

    const validate_champion = (error, results) => {
        if (error) {
            console.log("Error checkExistingChampion:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected champion owned by players ${data.player_id} is not found!`
                });
            }
            else {
                res.locals.champion_id = data.champion_id;
                next();
            }
        }
    }
    picked_championModel.checkExistingChampionToDelete(data, validate_champion)
}

////////////////////////////////////////////
//Controller to DELETE Specific Champion and Player by Id.
///////////////////////////////////////////
module.exports.deletePlayerAndChampionById = (req, res, next) => {
    const data = {
        player_id: res.locals.player_id,
        champion_id: res.locals.champion_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerAndChampionById:", error);
            res.status(500).json(error);
        } else {
            console.log(results)
            res.status(200).json({
                message: `You successfully deleted the Battle History when (Player Name : ${results[0][0].player_name}) picked (${results[0][0].champion_name}) champion.)`
            });
        }
    }
    picked_championModel.deletePlayerAndChampionById(data, callback);
}




////////////////////////////////////////////
//Controller to check existing players to Create
///////////////////////////////////////////
module.exports.checkExistingPlayerToCreate = (req, res, next) => {

    const data = {
        player_id: req.body.player_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingPlayer:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen player to CREATE is not in the player list! Try another player_id."
                });
            }
            else {
                res.locals.player_id = data.player_id;
                next();
            }
        }
    }
    picked_championModel.checkExistingPlayerToCreate(data, validate_challenge)
}


////////////////////////////////////////////
//Controller to check existing champion to Create
///////////////////////////////////////////
module.exports.checkExistingChampionToCreate = (req, res, next) => {

    const data = {
        player_id: res.locals.player_id,
        champion_id: req.body.champion_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistinChampions:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen champion to CREATE is not in the champion list! Try another champion_id."
                });
            }
            else {
                res.locals.champion_id = data.champion_id;
                next();
            }
        }
    }
    picked_championModel.checkExistingChampionToCreate(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to CREATE new picked champion
///////////////////////////////////////////
module.exports.createNewPickedChampion = (req, res, next) => {
    const data = {
        player_id: res.locals.player_id,
        champion_id: res.locals.champion_id
    };

    const creatingChallenge = (error, results) => {
        if (error) {
            console.error("Error createNewPickedChampion:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                message: `A champion picked by player is created successfully!`,
                player_name: `${results[1][0].player_name} (player_id : ${data.player_id}).`,
                champion_name: `${results[1][0].champion_name} (champion_id : ${data.champion_id}).`
            });
        }
    }
    picked_championModel.insertSingleToCreatePickedChampion(data, creatingChallenge);
};

