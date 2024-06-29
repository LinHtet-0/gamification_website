// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

/////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/userModel.js");

//////////////////////////////////////////////////////
// GET ALL USERS
//////////////////////////////////////////////////////
module.exports.readAllUser = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllUser:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

//////////////////////////////////////////////////////
// GET ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.readPlayerByUser = (req, res, next) =>
{
    const data = {
        user_id: req.params.userId,
        player_id: req.params.playerId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerByUser:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                message: "User - Player record not found"
            });
        } else {
            res.status(200).json(results[0]);
        }
    }
    model.selectPlayerUserRel(data, callback);
}

//////////////////////////////////////////////////////
// GET ALL USERS BY ID
//////////////////////////////////////////////////////
module.exports.readUserById = (req, res, next) =>
{
    const data = {
        id: req.params.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "User not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR LOGIN
//////////////////////////////////////////////////////

module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 1) {
            res.locals.id = results[0].user_id;
            res.locals.userId= results[0].user_id;
            res.locals.hash = results[0].password;
            next();
        } else if (results.length > 1) {
            res.status(409).json({
                message: "Username already exists"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    model.selectUserByUsernameAndPassword(data, callback);
}

//////////////////////////////////////////////////////
// CONTROLLER FOR REGISTER
//////////////////////////////////////////////////////

module.exports.register = (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username,
        playername: req.body.playername,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            res.locals.message = "User " + data.username + " created successfully.";
            res.locals.userId = results.insertId;
            res.locals.email = data.email;
            res.locals.password = data.password;
            res.locals.playername = data.playername;
            res.locals.time = new Date();
            next();
        }
    }
    model.insertSingle(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLEWARE FOR CHECK IF USERNAME OR EMAIL EXISTS
//////////////////////////////////////////////////////
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    if (!req.body.username || !req.body.email) {
        res.status(400).json({ Error: "Missing required data." });
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectByUsernameOrEmail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                next();
            }
        }
    }

    model.chkExist(data, callback);
}

//////////////////////////////////////////////////////
// MIDDLWARE FOR CHECK IF PLAYER BELONGS TO USER
//////////////////////////////////////////////////////
module.exports.readPlayerByUser = (req, res, next) =>
{
    const data = {
        user_id: req.params.userId,
        player_id: req.params.playerId
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerByUser:", error);
            res.status(500).json(error);
        } else if (results.length == 0) {
            res.status(404).json({
                message: "User - Player record not found"
            });
        } else {
            res.status(200).json(results[0]);
        }
    }
    model.selectPlayerUserRel(data, callback);
}

//////////////////////////////////////////////////////
// UPDATE USER BY ID
//////////////////////////////////////////////////////
module.exports.updateUserById = (req, res, next) =>
{
    if(req.body.username == undefined)
    {
        res.status(400).json({
            message: "Error: username is undefined"
        });
        return;
    }

    const data = {
        user_id: req.params.id,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
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

    model.updateById(data, callback);
}

//////////////////////////////////////////////////////
// DELETE USER BY ID
//////////////////////////////////////////////////////
module.exports.deleteUserById = (req, res, next) =>
{
    const data = {
        user_id: req.params.id
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

    model.deleteById(data, callback);
} 