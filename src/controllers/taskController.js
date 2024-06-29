// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const taskModel = require("../models/taskModel.js");

////////////////////////////////////////////
//Controller to create new task
///////////////////////////////////////////
module.exports.createNewTask = (req, res, next) => {
    if (req.body.task_name == undefined || req.body.task_description == undefined || req.body.task_reward == undefined) {
        res.status(400).send("Error: title or description or points is undefined");
        return;
    }

    const data = {
        title: req.body.task_name,
        description: req.body.task_description,
        points: req.body.task_reward
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            res.status(201).json({
                task_id: results.insertId,
                title: data.title,
                description: data.description,
                points: data.points
            });
        }
    }
    taskModel.insertSingle(data, callback);
}

////////////////////////////////////////////
//Controller to select all tasks
///////////////////////////////////////////
module.exports.readAllTask = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json();
        }
        else res.status(200).json(results);
    }
    taskModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select task by id
///////////////////////////////////////////
module.exports.readTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    taskModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to update task
///////////////////////////////////////////
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.task_name == undefined || req.body.task_description == undefined || req.body.task_reward == undefined) {
        res.status(400).json({
            message: "Error: title or description or points is undefined"
        });
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.task_name,
        description: req.body.task_description,
        points: req.body.task_reward
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updatePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json({
                task_id: parseInt(data.task_id),
                title: data.title,
                description: data.description,
                points: data.points
            });
        }
    }
    taskModel.updateById(data, callback);
}

////////////////////////////////////////////
//Controller to delete task by id
///////////////////////////////////////////
module.exports.deleteTaskById = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deletePlayerById:", error);
            res.status(500).json(error);
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send();
        }
    }
    taskModel.deleteById(data, callback);
}