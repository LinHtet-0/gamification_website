// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const messageModel = require("../models/messageModel.js");

////////////////////////////////////////////
//Controller to read all messages
///////////////////////////////////////////
module.exports.readAllMessages = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllChampionPickedByPlayers:", error);
            res.status(500).json(error);
        }
        else res.status(200).json([results,res.locals.userId]);
    }
    messageModel.selectAllMessage(callback);
}

////////////////////////////////////////////
//Controller to create teams
///////////////////////////////////////////
module.exports.sendMessages = (req, res, next) => {
    const player_id = res.locals.userId;

    const data = {
        message : req.body.message,
        player_id : player_id
    }

    const callback = (error, results) => {
        if (error) {
            console.log("Error checkExistingTeamName:", error);
            res.status(500).json(error);
        }
        else {
            res.status(201).json(results)
        }
    }
    messageModel.insertSingle(data, callback)
}

//////////////////////////////////////////////////////
// DELETE message BY ID
//////////////////////////////////////////////////////
module.exports.deleteMessages = (req, res, next) =>
{
    const data = {
        id : req.params.message_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    messageModel.deleteById(data, callback);
} 

//////////////////////////////////////////////////////
// UPDATE Message BY ID
//////////////////////////////////////////////////////
module.exports.updateMessageById = (req, res, next) =>
{

    const data = {
        id : req.params.message_id,
        message : req.body.message
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Message not found"
                });
            }
            else res.status(204).send(); // 204 No Content
        }
    }

    messageModel.updateById(data, callback);
}
