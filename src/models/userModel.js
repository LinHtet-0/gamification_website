// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg

//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL USER
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// SELECT ALL PLAYERS BY USER
//////////////////////////////////////////////////////
module.exports.selectPlayerUserRel = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT
            PlayerUserRel.user_id,
            PlayerUserRel.player_id,
            User.username,
            Player.name AS "character_name",
            Player.level AS "character_level",
            Player.created_on AS "char_created_on",
            User.created_on AS "user_created_on"
        FROM
            PlayerUserRel
            INNER JOIN User ON (PlayerUserRel.user_id = User.user_id)
            INNER JOIN Player ON (PlayerUserRel.user_id = User.user_id)
        WHERE
            (PlayerUserRel.user_id = ? AND PlayerUserRel.player_id = ?);
    `;
    const VALUES = [data.user_id, data.player_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY ID
//////////////////////////////////////////////////////
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE id = ?;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME AND PASSWORD
//////////////////////////////////////////////////////
module.exports.selectUserByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////
module.exports.chkExist = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id FROM User
        WHERE username = ? OR email = ?;
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// INSERT USER
//////////////////////////////////////////////////////

module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.username, data.email, data.password];

pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// UPDATE USER BY ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE User 
    SET username = ?, email = ?, password = ?
    WHERE user_id = ?;
    `;
const VALUES = [data.username, data.email, data.password, data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

//////////////////////////////////////////////////////
// DELETE USER BY ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM User 
    WHERE user_id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}