// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Challenges Done By Players
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM challenge_progress;
        `;
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
module.exports.checkExistingChallengeToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenges
    WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check existing progress to create
///////////////////////////////////////////
module.exports.checkExistingProgressToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenge_progress
    WHERE player_id = ? AND challenge_id = ?
    ;`;
    const VALUES = [data.player_id, data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Challenges Information
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO challenge_progress (player_id, challenge_id, completed_on)
    VALUES (?, ?, NOW());
    UPDATE players
    SET players.experience_points = ?
    WHERE players.player_id = ?;
    `;
    const VALUES = [data.player_id, data.challenge_id, data.experience_points, data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Players
///////////////////////////////////////////
module.exports.checkExistingPlayerToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenge_progress
    WHERE player_id = ?
    ;`;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check challenges
///////////////////////////////////////////
module.exports.checkExistingChallengeToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenge_progress
    WHERE player_id = ? AND challenge_id = ?
    ;`;
    const VALUES = [data.player_id, data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete challenge progress
///////////////////////////////////////////
module.exports.deleteChallengeProgressById = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM players
        WHERE player_id = ?;
        DELETE FROM challenge_progress
        WHERE player_id = ? AND challenge_id = ?;
    `;
    const VALUES = [data.player_id, data.player_id, data.challenge_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}