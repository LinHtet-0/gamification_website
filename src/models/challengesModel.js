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
        SELECT * FROM challenges;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select Challenge by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenges WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Challenge
///////////////////////////////////////////
module.exports.checkExistingChallenge = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenges 
    WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Select Challenge by Id To Get Players
///////////////////////////////////////////
module.exports.selectByIdToGetPlayers = (data, callback) => {
    const SQLSTATMENT = `
    SELECT 
    players.player_id,
    players.player_name,
    challenges.challenge_name,
    challenge_progress.completed_on,
    challenges.challenge_reward
    FROM challenge_progress
    INNER JOIN challenges ON challenge_progress.challenge_id = challenges.challenge_id
    INNER JOIN players ON challenge_progress.player_id = players.player_id
    WHERE challenges.challenge_id = ?;
    `;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//CREATE Challenge
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO challenges (challenge_name, challenge_description, challenge_reward)
    VALUES (?, ?, ?)
    ;`;
    const VALUES = [data.challenge_name, data.challenge_description, data.challenge_reward];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Challenge to delete
///////////////////////////////////////////
module.exports.checkExistingChallengeToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenges 
    WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete challenge by id
///////////////////////////////////////////
module.exports.deleteByIdForChallenges = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM challenges
        WHERE challenge_id = ?;
        DELETE FROM challenges
        WHERE challenge_id = ?;
    `;
    const VALUES = [data.challenge_id, data.challenge_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Challenge to UPDATE
///////////////////////////////////////////
module.exports.checkExistingChallengeToUpdate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM challenges 
    WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//UPDATE Challenges Information
///////////////////////////////////////////
module.exports.updateChallengeById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE challenges 
    SET challenge_name = ?, challenge_description = ?, challenge_reward = ?
    WHERE challenge_id = ?;
    SELECT * FROM challenges
    WHERE challenge_id = ?
    ;`;
    const VALUES = [data.challenge_name, data.challenge_description, data.challenge_reward,  data.challenge_id, data.challenge_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}