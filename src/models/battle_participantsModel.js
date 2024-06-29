// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Battle Participants
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM battle_participants;
        `;
    pool.query(SQLSTATMENT, callback)
}


////////////////////////////////////////////
//Check battle participants
///////////////////////////////////////////
module.exports.checkExistingBattleParticipants = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM battle_participants
    WHERE team_one = ?
    ;`;
    const VALUES = [data.team_one];

    pool.query(SQLSTATMENT, VALUES, callback);
}



////////////////////////////////////////////
//Select Team by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT 
    teams.team_id,
    teams.team_name,
    teams.player_one,
    teams.player_two,
    teams.player_three,
    teams.player_four,
    teams.player_five
    FROM battle_participants
    INNER JOIN teams ON battle_participants.team_one = teams.team_id
    WHERE battle_participants.team_one = ?;
    `;
    const VALUES = [data.team_one];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Select battle results by Id
///////////////////////////////////////////
module.exports.selectByIdToGetBattleResults = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM battle_participants WHERE battle_participants.battle_id = ?;
    SELECT * FROM battles WHERE battles.battle_id = ?;
    `;
    const VALUES = [data.battle_id, data.battle_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}