// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Battles
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM battles;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Check Existing Team battles
///////////////////////////////////////////
module.exports.checkExistingTeamBattleToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM battle_participants
    WHERE team_one = ? AND team_two = ?;
    `;
    const VALUES = [data.team_one, data.team_two];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//CREATE new battle results
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO battles (start_time, end_time, winner_team_id , loser_team_id)
    VALUES (NOW() - INTERVAL 15 MINUTE, NOW(), ?, ?);
    SELECT * FROM battles
    WHERE winner_team_id = ? AND loser_team_id = ?;
    `;
    const VALUES = [data.winner_team_id, data.loser_team_id, data.winner_team_id, data.loser_team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


