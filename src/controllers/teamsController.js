// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const teamsModel = require("../models/teamsModel.js");


////////////////////////////////////////////
//Controller to read all Teams participants
///////////////////////////////////////////
module.exports.readAllTeams = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllchampions:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    teamsModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to read all participants by Team Name
///////////////////////////////////////////
module.exports.readAllParticipantsByTeamName = (req, res, next) => {
    const data = {
        team_name: req.params.teamName
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllParticipantsByTeamName:", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected Team Name is not in the team list!"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    teamsModel.selectAllByTeamName(data, callback);
}


////////////////////////////////////////////
//Controller to create teams
///////////////////////////////////////////
module.exports.createNewTeams = (req, res, next) => {

    if (req.body.team_name == undefined || req.body.player_one == undefined || req.body.player_two == undefined || req.body.player_three == undefined || req.body.player_four == undefined || req.body.player_five == undefined) {
        res.status(400).json({
            message: "To create a team, provide required Team Name and one team has '5' members in total!"
        })
    }

    const data = {
        team_name: req.body.team_name,
        player_one: req.body.player_one,
        player_two: req.body.player_two,
        player_three: req.body.player_three,
        player_four: req.body.player_four,
        player_five: req.body.player_five
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingTeamName:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json({
                team_id: results.insertId,
                team_name: data.team_name,
                player_one: data.player_one,
                player_two: data.player_two,
                player_three: data.player_three,
                player_four: data.player_four,
                player_five: data.player_five
            })
        }
    }
    teamsModel.insertSingle(data, callback)
}

////////////////////////////////////////////
//Controller to delete teams
///////////////////////////////////////////
module.exports.deleteTeamsById = (req, res, next) => {
    const data = {
        team_id: req.params.team_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Teams not found!"
                });
            }
            else res.status(204).send(); 
        }
    }
    teamsModel.deleteById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing teams
///////////////////////////////////////////
module.exports.checkTeamName = (req, res, next) => {

    const data = {
        team_name : req.params.teamName,
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error heckTeamName", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Your selected teams not found!`
                });
            }
            else {
                res.locals.team_name = data.team_name;
                next();
            }
        }
    }
   teamsModel.checkTeamName(data, callback)
}

////////////////////////////////////////////
//Controller to check existing player in team
///////////////////////////////////////////
module.exports.readPlayerDetailById = (req, res, next) => {

    const data = {
        team_name : res.locals.team_name,
        player_id : req.params.player_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error readPlayerDetail", error);
            res.status(500).json(error);
        }
        else {
            res.status(200).json({
                Team_name : data.team_name,
                Selected_playerDetail : results[0]
            })
        }
    }
   teamsModel.selectById(data, callback)
}

////////////////////////////////////////////
//Controller to select Team by id
///////////////////////////////////////////

module.exports.readByTeamId = (req, res, next) => {
    const data = {
        team_id: req.params.team_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readByTeamId:", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected team is not found in team list! Try to choose another champion."
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    teamsModel.selectTeamById(data, callback);
}