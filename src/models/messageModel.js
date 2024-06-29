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
module.exports.selectAllMessage = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM messages
        INNER JOIN players ON messages.player_id = players.player_id
        ORDER BY messages.message_created_on ASC;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Check player
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO messages (player_id,message,message_created_on)
    VALUES (?, ?, NOW());
    `;
    const VALUES = [data.player_id,data.message];

    pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// DELETE USER BY ID
//////////////////////////////////////////////////////
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM messages 
    WHERE id = ?;

    ALTER TABLE User AUTO_INCREMENT = 1;
    `;
const VALUES = [data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}


//////////////////////////////////////////////////////
// UPDATE message BY ID
//////////////////////////////////////////////////////
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE messages 
    SET message = ?
    WHERE id = ?;
    `;
const VALUES = [data.message, data.id];

pool.query(SQLSTATMENT, VALUES, callback);
}
