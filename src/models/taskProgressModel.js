// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Check user id and task id
///////////////////////////////////////////
module.exports.checkUserIdAndTaskId = (data, callback) => {
    const SQLSTATMENT = `
        SELECT
        User.*,
        Task.*
        FROM 
        User, Task
        WHERE
        user_id = ? AND task_id = ?
    ;`;
    const VALUES = [data.user_id, data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Create new task progress
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
        VALUES (?, ?, ?, ?)
    ;`;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Read task progress by id
///////////////////////////////////////////
module.exports.selectTaskProgressById = (data, callback) => {

    const SQLSTATMENT = `
        SELECT progress_id,user_id,task_id, DATE_FORMAT(completion_date, '%Y-%m-%d') AS completion_date,notes  FROM TaskProgress 
        WHERE progress_id = ?
    ;`;
    const VALUES = [data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Task progress by id
///////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE TaskProgress 
        SET notes = ?
        WHERE progress_id = ?; 
        SELECT progress_id,user_id,task_id, DATE_FORMAT(completion_date, '%Y-%m-%d') AS completion_date,notes FROM TaskProgress WHERE progress_id = ?
    ;`;
    const VALUES = [data.notes, data.progress_id, data.progress_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete task progress by progress_id
///////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
        DELETE FROM TaskProgress
        WHERE progress_id = ?
    ;`;
    const VALUES = [data.progress_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Players
///////////////////////////////////////////
module.exports.checkExistingPlayerToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check challenges
///////////////////////////////////////////
module.exports.checkExistingTaskToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM task
    WHERE task_id = ?
    ;`;
    const VALUES = [data.task_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Challenges Information
///////////////////////////////////////////
module.exports.insertSingleForTaskProgress = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO taskprogress (user_id, player_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, NOW(), ?);
    UPDATE players
    SET players.experience_points = ?
    WHERE players.player_id = ?;
    `;
    const VALUES = [data.player_id, data.player_id, data.task_id, data.notes, data.experience_points, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}