// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Create task
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO Task (title, description, points)
        VALUES (?, ?, ?)
    ;`;
    const VALUES = [data.title, data.description, data.points];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//read all tasks
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Task
    ;`;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//read task by id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM Task
        WHERE task_id = ?
    ;`;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE task by id
///////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE Task 
        SET title = ?, description = ?, points = ?
        WHERE task_id = ?
    ;`;
    const VALUES = [data.title, data.description, data.points, data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//delete task by id
///////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
        DELETE FROM Task
        WHERE task_id = ?
    ;`;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}