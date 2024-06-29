// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");


////////////////////////////////////////////
//Create new task progress
///////////////////////////////////////////
module.exports.insertUserPlayerId = (data, callback) => {
    const SQLSTATMENT = `
        INSERT INTO playeruserrel (player_id, user_id)
        VALUES (?, ?)
    ;`;
    const VALUES = [data.player_id, data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}
