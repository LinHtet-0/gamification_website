// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Challenges
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM picked_champion;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select Challenge by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT 
    DISTINCT players.player_id,
    players.player_name,
    champions.champion_name,
    champions.champion_type
    FROM picked_champion
    INNER JOIN players ON picked_champion.player_id = players.player_id
    INNER JOIN champions ON picked_champion.champion_id = champions.champion_id
    WHERE players.player_id = ?;
    SELECT COUNT(champion_id) AS count
    FROM picked_champion
    GROUP BY player_id
    HAVING player_id = ?;
    `;
    const VALUES = [data.player_id, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check player
///////////////////////////////////////////
module.exports.checkExistingPlayerToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM picked_champion
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Champion to delete
///////////////////////////////////////////
module.exports.checkExistingChampionToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM picked_champion 
    WHERE player_id = ? AND champion_id = ?
    ;`;
    const VALUES = [data. player_id, data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete Player and Champion by id
///////////////////////////////////////////
module.exports.deletePlayerAndChampionById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT 
    players.player_name,
    champions.champion_name
    FROM picked_champion
    INNER JOIN players ON picked_champion.player_id = players.player_id
    INNER JOIN champions ON picked_champion.champion_id = champions.champion_id
    WHERE picked_champion.player_id = ? AND picked_champion.champion_id = ?;
    DELETE FROM picked_champion
    WHERE picked_champion.player_id = ? AND picked_champion.champion_id = ? 
    `;
    const VALUES = [data.player_id, data.champion_id, data.player_id, data.champion_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Player to create
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
//Check Champion to create
///////////////////////////////////////////
module.exports.checkExistingChampionToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions 
    WHERE champion_id = ?
    ;`;
    const VALUES = [data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//CREATE pikced_champion
///////////////////////////////////////////
module.exports.insertSingleToCreatePickedChampion = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO picked_champion (player_id, champion_id)
    VALUES (?, ?);
    SELECT 
    players.player_id,
    players.player_name,
    champions.champion_id,
    champions.champion_name
    FROM picked_champion
    INNER JOIN players ON picked_champion.player_id = players.player_id
    INNER JOIN champions ON picked_champion.champion_id = champions.champion_id
    WHERE picked_champion.player_id AND picked_champion.champion_id;
    `;
    const VALUES = [data.player_id, data.champion_id, data.player_id, data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}