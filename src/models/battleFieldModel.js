// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//read total matches
///////////////////////////////////////////
module.exports.retrieveTotalMatch = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM players
        WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
// insert total match
///////////////////////////////////////////
module.exports.updateTotalMatch = (data, callback) => {
    const SQLSTATMENT = `
        UPDATE players
        SET total_matches = ?
        WHERE player_id = ?
    ;`;
    const VALUES = [data.total_matches, data.player_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//Select all Battle Participants
///////////////////////////////////////////
module.exports.randomChampion = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM champions ORDER BY RAND();
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select winner champion id result
///////////////////////////////////////////
module.exports.compareBasicAttack= (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions
    WHERE basic_attack = GREATEST(?, ?)
    LIMIT 1;    
    `;
    const VALUES = [data.first_basic_attack, data.second_basic_attack];

    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// INSERT battle field
//////////////////////////////////////////////////////

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO battle_field (player_id, first_champion_id, second_champion_id , winner_champion_id, battle_started_time, battle_ended_time)
    VALUES (?, ?, ?, ?, NOW() - INTERVAL 15 MINUTE, NOW());
    SELECT * FROM champions 
    INNER JOIN battle_field ON champions.champion_id = battle_field.winner_champion_id
    WHERE battle_field.winner_champion_id = ?;
    `;
const VALUES = [data.player_id, data.first_champion_id, data.second_champion_id, data.winner_champion_id,data.winner_champion_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT ALL battleField result
//////////////////////////////////////////////////////
module.exports.selectAll = (data,callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM battle_field
    INNER JOIN champions ON battle_field.first_champion_id = champions.champion_id
    INNER JOIN players ON battle_field.player_id = players.player_id
    WHERE players.player_id = ?;
    `;
const VALUES = [data.player_id];
pool.query(SQLSTATMENT, VALUES, callback);
}