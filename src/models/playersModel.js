// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all players
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM players
    ;`;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select player by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT *,
    TIMESTAMPDIFF(YEAR, account_created_on, CURDATE()) AS account_years,
    TIMESTAMPDIFF(MONTH, account_created_on, CURDATE()) AS account_months,
    TIMESTAMPDIFF(DAY, account_created_on, CURDATE()) AS account_days
    FROM players WHERE player_id = ?;
    SELECT * FROM challenge_progress
    INNER JOIN players ON challenge_progress.player_id = players.player_id
    INNER JOIN challenges ON challenge_progress.challenge_id = challenges.challenge_id
    WHERE players.player_id = ?
    ;`;
    const VALUES = [data.player_id,data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//Delete player by id
///////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM players
        WHERE player_id = ?;
        DELETE FROM players
        WHERE player_id = ?;
    ;`;
    const VALUES = [data.player_id, data.player_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check playername
///////////////////////////////////////////
module.exports.checkExistingPlayerName = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE player_name = ?
    ;`;
    const VALUES = [data.player_name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check email
///////////////////////////////////////////
module.exports.checkExistingEmail = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE email = ?
    ;`;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Create a new player account
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO players (player_name, email, password, experience_points, level, rank_points, rank_status, favourite_champion, total_matches)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    UPDATE players
    SET account_created_on = NOW()
    WHERE player_name = ?;
    SELECT account_created_on FROM players
    WHERE player_name = ?
    ;`;
    const VALUES = [data.player_name, data.email, data.password, data.experience_points, data.level, data.rank_points, data.rank_status, data.favourite_champion, data.total_matches, data.player_name, data.player_name];

    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//Check existing players
///////////////////////////////////////////
module.exports.checkExistingPlayers = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Validation Player Name To UPDATE
///////////////////////////////////////////
module.exports.checkExistingPlayerNameToUpdate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE player_name = ?
    ;`;
    const VALUES = [data.player_name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Validation Email To UPDATE
///////////////////////////////////////////
module.exports.checkExistingEmailToUpdate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE email = ?
    ;`;
    const VALUES = [data.email];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Validation Existing Champion To UPDATE
///////////////////////////////////////////
module.exports.checkExistingChampion = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions
    WHERE champion_name = ?
    ;`;
    const VALUES = [data.champion_name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Players Information
///////////////////////////////////////////
module.exports.updateById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE players 
    SET player_name = ?, email = ?, password = ?, favourite_champion = ?
    WHERE player_id = ?;
    SELECT * FROM players
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_name, data.email, data.password, data.favourite_champion, data.player_id, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Players Data
///////////////////////////////////////////
module.exports.insertPlayerData = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO players (player_name, email, password, experience_points, level, rank_points, rank_status, favourite_champion, account_created_on, total_matches)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    ;`;
    const VALUES = [data.player_name, data.email, data.password, data.experience_points, data.level, data.rank_points, data.rank_status, data.favourite_champion, data.account_created_on, data.total_matches];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Retrieve player current rank points
///////////////////////////////////////////
module.exports.retrieveCurrentRankPoints = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE rank points
///////////////////////////////////////////
module.exports.updateRankPoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE players 
    SET rank_points = ?
    WHERE player_id = ?
    ;`;
    const VALUES = [data.rank_points, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//UPDATE rank points
///////////////////////////////////////////
module.exports.updateLostRankPoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE players 
    SET rank_points = ?
    WHERE player_id = ?
    ;`;
    const VALUES = [data.rank_points, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
