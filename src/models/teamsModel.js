// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Teams
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM teams;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select By Team Group
///////////////////////////////////////////
module.exports.selectAllByTeamName = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM teams
        WHERE team_name = ?;
        `;
    const VALUES = [data.team_name];
    pool.query(SQLSTATMENT, VALUES, callback)
}


////////////////////////////////////////////
//Check player
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO teams (team_name, player_one, player_two, player_three, player_four, player_five)
    VALUES (?, ?, ?, ?, ?, ?);
    `;
    const VALUES = [data.team_name, data.player_one, data.player_two, data.player_three, data.player_four, data.player_five];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete Team by ID
///////////////////////////////////////////
module.exports.deleteById = (data, callback) => {
    const SQLSTATMENT = `
    DELETE FROM teams
    WHERE team_id = ?;
    `;
    const VALUES = [data.team_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check team name
///////////////////////////////////////////
module.exports.checkTeamName = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM teams
    WHERE team_name = ?;
    `;
    const VALUES = [data.team_name];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check team player
///////////////////////////////////////////
module.exports.checkTeamPlayer = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM teams
    WHERE team_name = ? AND player_one = ?;
    `;
    const VALUES = [data.team_name, data.player_one];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Select player by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM players 
    WHERE player_id = ?;
    `;
    const VALUES = [data.player_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Select team by Id
///////////////////////////////////////////
module.exports.selectTeamById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM teams
    WHERE team_id = ?;
    `;
    const VALUES = [data.team_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

