// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const taskProgressModel = require("../models/taskProgressModel.js");

////////////////////////////////////////////
//Controller to check user id and task id
///////////////////////////////////////////
module.exports.checkUserIdAndTaskId = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).send("Error: completion_date is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json("user_id or task_id does not exist");
            }
            else next();
        }
    }
    taskProgressModel.checkUserIdAndTaskId(data, callback);
}

////////////////////////////////////////////
//Controller to create new task progress
///////////////////////////////////////////
module.exports.createNewTaskProgress = (req, res, next) => {
    if (req.body.completion_date == undefined) {
        res.status(400).send("Error: completion_date is undefined");
        return;
    }

    const data = {
        user_id: req.body.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewPlayer:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                progress_id: results.insertId,
                user_id: data.user_id,
                task_id: data.task_id,
                completion_date: data.completion_date,
                notes: data.notes
            });
        }
    }
    taskProgressModel.insertSingle(data, callback);
}

////////////////////////////////////////////
//Controller to select task progress by id
///////////////////////////////////////////
module.exports.readTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: `Progrsss_id does not exist`
                })
            }
            else
                res.status(200).json(results[0]);
        }
    }

    taskProgressModel.selectTaskProgressById(data, callback);
}

////////////////////////////////////////////
//Controller to update task progress by id
///////////////////////////////////////////
module.exports.updateTaskProgressById = (req, res, next) => {
    if (req.body.notes == undefined) {
        res.status(400).send("Bad Request, the request body is missing notes")
    }
    const data = {
        progress_id: req.params.progress_id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateUserById:", error);
            res.status(500).json(error);
        } else {
            if (results[0].affectedRows == 0) {
                res.status(404).json({
                    message: "Progress_id does not exist"
                });
            }
            else res.status(200).json({
                progress_id:data.progress_id,
                user_id:results[1][0].user_id,
                task_id:results[1][0].task_id,
                completion_date:results[1][0].completion_date,
                notes: data.notes
            });
        }
    }

    taskProgressModel.updateById(data, callback);
}

////////////////////////////////////////////
//Controller to delete task progress by id
///////////////////////////////////////////
module.exports.deleteTaskProgressById = (req, res, next) => {
    const data = {
        progress_id: req.params.progress_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Progress_id does not exist"
                });
            }
            else res.status(204).send();
        }
    }
    taskProgressModel.deleteById(data, callback);
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
    taskProgressModel.checkExistingPlayerToCreate(data, callback)
}

////////////////////////////////////////////
//Controller to check existing challenges
///////////////////////////////////////////
module.exports.checkExistingTaskToCreate = (req, res, next) => {

    const data = {
        task_id: req.params.task_id
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
                console.log(results);
                res.locals.task_id = data.task_id;
                res.locals.title = results[0].title;
                res.locals.points = results[0].points;
                next();
            }
        }
    }
    taskProgressModel.checkExistingTaskToCreate(data, callback)
}

////////////////////////////////////////////
//Controller to CREATE new challenge progress
///////////////////////////////////////////
module.exports.createNewTaskProgresses = (req, res, next) => {
    const data = {
        notes: req.body.note,
        player_id : res.locals.player_id,
        task_id: res.locals.task_id,
        title: res.locals.title,
        experience_points: res.locals.points + res.locals.player_experience_points
    };

    const creatingChallenge = (error, results) => {
        if (error) {
            console.error("Error createNewChallengeProgress:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json(
                [data.task_id, data.experience_points,data.title, res.locals.points, data.notes]
            );
        }
    }
    taskProgressModel.insertSingleForTaskProgress(data, creatingChallenge);
};

