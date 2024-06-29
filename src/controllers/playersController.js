// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const playersModel = require("../models/playersModel.js");


////////////////////////////////////////////
//Controller to read all players
///////////////////////////////////////////
module.exports.readAllPlayers = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPlayers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json([results, res.locals.userId]);
    }

    playersModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select player by id
///////////////////////////////////////////

module.exports.readPlayerById = (req, res, next) => {
    const data = {
        player_id: req.params.player_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: "Player not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    playersModel.selectById(data, callback);
}


////////////////////////////////////////////
//Controller to delete player by Id
///////////////////////////////////////////
module.exports.deletePlayerById = (req, res, next) => {
    const data = {
        player_id: req.params.player_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results[1].affectedRows == 0) {
                res.status(404).json({
                    message: `Selected player not found! Please, choose the correct player-id.`
                });
            }
            else {
                res.status(200).json({
                    message: `Player's Name : ${results[0][0].player_name} with level ${results[0][0].level} is successfully deleted!`
                });
            }
        }
    }
    playersModel.deleteById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing player name
///////////////////////////////////////////
module.exports.checkExistingPlayerName = (req, res, next) => {
    if (req.body.player_name == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: `Input Fields (player_name, email, passowrd) are required to create a new user.`
        });
        return;
    }

    const data = {
        player_name: req.body.player_name,
        email: req.body.email,
        passowrd: req.body.password
    }

    const validate_playerName = (error, result) => {
        if (error) {
            console.log("Error checkExistingPlayerName:", error);
            res.status(500).json(error);
        }
        else {
            if (result.length > 0) {
                res.status(409).json({
                    message: "Player's name has already existed."
                });
            }
            else {
                next();
            }
        }
    }
    playersModel.checkExistingPlayerName(data, validate_playerName)
}

////////////////////////////////////////////
//Controller to check existing email
///////////////////////////////////////////
module.exports.checkExistingEmail = (req, res, next) => {
    if (req.body.player_name == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: `Input Fields (player_name, email, passowrd) are required to create a new user.`
        });
        return;
    }

    const data = {
        player_name: req.body.player_name,
        email: req.body.email,
        passowrd: req.body.password
    }

    const validate_email = (error, results) => {
        if (error) {
            console.log("Error checkExistingEmail:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Email has been already used by other players."
                });
            }
            else {
                next();
            }
        }
    }
    playersModel.checkExistingEmail(data, validate_email)
}

////////////////////////////////////////////
//Controller to create new player account
///////////////////////////////////////////
module.exports.createNewPlayer = (req, res, next) => {
    if (req.body.player_name == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json({
            message: `Input Fields (player_name, email, passowrd) are required to create a new user.`
        });
        return;
    }

    const data = {
        player_name: req.body.player_name,
        email: req.body.email,
        password: req.body.password,
        experience_points: 0,
        level: 1,
        rank_points: 0,
        rank_status: "Bronze",
        favourite_champion: "Not Selected yet!",
        total_matches: 0
    }

    if (req.body.favourite_champion != undefined) {
        data.favourite_champion = req.body.favourite_champion;
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                message: `A new player has been created successfully`,
                player_id: results[0].insertId,
                player_name: data.player_name,
                email: data.email,
                password: data.password,
                experience_points: data.experience_points,
                level: data.level,
                rank_points: data.rank_points,
                rank_status: data.rank_status,
                favourite_champion: data.favourite_champion,
                account_created_on: results[2][0].account_created_on,
                total_matches: data.total_matches
            });
        }
    }
    playersModel.insertSingle(data, callback);
}

module.exports.checkExistingPlayers = (req, res, next) => {

    const data = {
        player_id: req.params.player_id,
        player_name: req.body.player_name,
        email: req.body.email,
        champion_name: req.body.champion_name
    }

    const validate_players = (error, results) => {
        if (error) {
            console.log("Error checkExistingPlayers:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Player not found!"
                });
            }
            else {
                res.locals.player_id = results[0].player_id;
                next();
            }
        }
    }
    playersModel.checkExistingPlayers(data, validate_players)
}

////////////////////////////////////////////
//Controller to check existing player name To UPDATE
///////////////////////////////////////////
module.exports.checkExistingPlayerNameToUpdate = (req, res, next) => {

    const data = {
        player_id: res.locals.player_id,
        player_name: req.body.player_name,
        email: req.body.email,
        passowrd: req.body.password
    }

    const validate_playerName = (error, results) => {
        if (error) {
            console.log("Error checkExistingPlayerName:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Player's name has already existed."
                });
            }
            else {
                res.locals.player_name = data.player_name;
                next();
            }
        }
    }
    playersModel.checkExistingPlayerNameToUpdate(data, validate_playerName)
}

////////////////////////////////////////////
//Controller to check existing email to UPDATE
///////////////////////////////////////////
module.exports.checkExistingEmailToUpdate = (req, res, next) => {

    const data = {
        player_id: res.locals.player_id,
        player_name: res.locals.player_name,
        email: req.body.email,
        passowrd: req.body.password
    }

    const validate_email = (error, results) => {
        if (error) {
            console.log("Error checkExistingEmail:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Email has been already used by other players."
                });
            }
            else {
                res.locals.email = data.email;
                next();
            }
        }
    }
    playersModel.checkExistingEmailToUpdate(data, validate_email)
}

////////////////////////////////////////////
//Controller to check existing champion To UPDATE
///////////////////////////////////////////
module.exports.checkExistingChampionsToUpdate = (req, res, next) => {

    const data = {
        player_id: res.locals.player_id,
        player_name: res.locals.player_name,
        email: res.locals.email,
        champion_name: req.body.champion_name
    }

    const validate_email = (error, results) => {
        if (error) {
            console.log("Error checkExistingEmail:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen champion has not been released yet in this game! Choose the existing champion."
                });
            }
            else {
                res.locals.favourite_champion = data.champion_name;
                next();
            }
        }
    }
    playersModel.checkExistingChampion(data, validate_email)
}

////////////////////////////////////////////
//Controller to UPDATE Players' Information
///////////////////////////////////////////
module.exports.updatePlayerById = (req, res, next) => {
    const data = {
        player_id: res.locals.player_id,
        player_name: res.locals.player_name,
        email: res.locals.email,
        password: req.body.password,
        favourite_champion: res.locals.favourite_champion,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            const storedData = results[1][0];
            res.status(200).json({
                message: `You updated successfully`,
                player_name: storedData.player_name,
                email: storedData.email,
                password: storedData.password,
                favourite_champion: storedData.favourite_champion
            });
        }
    }
    playersModel.updateById(data, callback);
}

////////////////////////////////////////////
//Controller to insert  Players' Data
///////////////////////////////////////////

module.exports.insertPlayerData = (req, res, next) => {
    const data = {
        player_name : res.locals.playername,
        email : res.locals.email,
        password : res.locals.password,
        experience_points : 0,
        level : 0,
        rank_points : 0,
        rank_status : "Bronze",
        favourite_champion : "Not Selected yet!",
        total_matches : 0,
        account_created_on: res.locals.time
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            res.locals.player_id = results.insertId;
            next();
        }
    }
    playersModel.insertPlayerData(data, callback);
}

////////////////////////////////////////////
//Controller to UPDATE Players' rank points
///////////////////////////////////////////
module.exports.retrieveCurrentRankPoints = (req, res, next) => {
    const playerId = res.locals.userId;

    const data = {
        player_id: playerId,
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            res.locals.rank_points = results[0].rank_points;
            next();
        }
    }
    playersModel.retrieveCurrentRankPoints(data, callback);
}

////////////////////////////////////////////
//Controller to UPDATE Players' rank points
///////////////////////////////////////////
module.exports.updateRankPoints = (req, res, next) => {

    const data = {
        player_id: res.locals.userId,
        rank_points: res.locals.rank_points + 10
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    playersModel.updateRankPoints(data, callback);
}

////////////////////////////////////////////
//Controller to UPDATE Players' rank points
///////////////////////////////////////////
module.exports.updateLostRankPoints = (req, res, next) => {

    const data = {
        player_id: res.locals.userId,
        rank_points: res.locals.rank_points - 5
    }
    
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json(results);
        }
    }
    playersModel.updateLostRankPoints(data, callback);
}

