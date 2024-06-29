// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Database
///////////////////////////////////////////
const pool = require("../services/db.js");

////////////////////////////////////////////
//Select all Champions
///////////////////////////////////////////
module.exports.selectAll = (callback) => {
    const SQLSTATMENT = `
        SELECT * FROM champions;
        `;
    pool.query(SQLSTATMENT, callback)
}

////////////////////////////////////////////
//Select Champion by Id
///////////////////////////////////////////
module.exports.selectById = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions WHERE champion_id = ?;
    `;
    const VALUES = [data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check playername
///////////////////////////////////////////
module.exports.checkExistingChampionToDelete = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions
    WHERE champion_id = ?;
    `;
    const VALUES = [data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Delete challenge by id
///////////////////////////////////////////
module.exports.deleteByIdForChampions = (data, callback) => {
    const SQLSTATMENT = `
        SELECT * FROM champions
        WHERE champion_id = ?;
        DELETE FROM champions
        WHERE champion_id = ?;
    `;
    const VALUES = [data.champion_id, data.champion_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Check Champion to UPDATE
///////////////////////////////////////////
module.exports.checkExistingChampionToUpdate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions 
    WHERE champion_id = ?;
    `;
    const VALUES = [data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//UPDATE Champions Information
///////////////////////////////////////////
module.exports.updateChampionById = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE champions 
    SET champion_name = ?, basic_attack = ?, ability_one = ?, ability_two = ?, ability_three = ?, champion_type = ?
    WHERE champion_id = ?;
    SELECT * FROM champions
    WHERE champion_id = ?;
    `;
    const VALUES = [data.champion_name, data.basic_attack, data.ability_one, data.ability_two, data.ability_three, data.champion_type, data.champion_id, data.champion_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

////////////////////////////////////////////
//Validate Champions
///////////////////////////////////////////
module.exports.checkExistingChampionToCreate = (data, callback) => {
    const SQLSTATMENT = `
    SELECT * FROM champions 
    WHERE champion_name = ? || basic_attack = ? || ability_one = ? || ability_two = ? || ability_three = ?;
    `;
    const VALUES = [data.champion_name, data.basic_attack, data.ability_one, data.ability_two, data.ability_three];

    pool.query(SQLSTATMENT, VALUES, callback);
}


////////////////////////////////////////////
//CREATE Champions
///////////////////////////////////////////
module.exports.insertSingle = (data, callback) => {
    const SQLSTATMENT = `
    INSERT INTO champions (champion_name, basic_attack, ability_one, ability_two, ability_three, champion_type)
    VALUES (?, ?, ?, ?, ?, ?)
    ;`;
    const VALUES = [data.champion_name, data.basic_attack, data.ability_one, data.ability_two, data.ability_three, data.champion_type];

    pool.query(SQLSTATMENT, VALUES, callback);
}


