// Name : Lin Htet
// Admission Number: 2340304
// Class : DIT/FT/1B/08
// Ichat Email : LHHTET.23@ichat.sp.edu.sg


////////////////////////////////////////////
//Required Model
///////////////////////////////////////////
const championsModel = require("../models/championsModel.js");

////////////////////////////////////////////
//Controller to read all Champions
///////////////////////////////////////////
module.exports.readAllChampions = (req, res, next) => {
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllchampions:", error);
            res.status(500).json(error);
        }
        else res.status(200).json(results);
    }
    championsModel.selectAll(callback);
}

////////////////////////////////////////////
//Controller to select Champion by id
///////////////////////////////////////////

module.exports.readChampionById = (req, res, next) => {
    const data = {
        champion_id: req.params.champion_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readChampionById:", error);
            res.status(500).json(error);
        } else {

            if (results.length == 0) {
                res.status(404).json({
                    message: "Your selected champion has not been released yet! Try to choose another champion."
                });
            }
            else res.status(200).json(results[0]);
        }
    }
    championsModel.selectById(data, callback);
}

////////////////////////////////////////////
//Controller to check existing challenges to DELETE
///////////////////////////////////////////
module.exports.checkExistingChampionsToDelete = (req, res, next) => {

    const data = {
        champion_id: req.params.champion_id
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingChampion:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen champion to DELETE is not in the champion list! Try another champion_id."
                });
            }
            else {
                res.locals.champion_id = data.champion_id;
                next();
            }
        }
    }
    championsModel.checkExistingChampionToDelete(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to DELETE Challenge by Id.
///////////////////////////////////////////
module.exports.deleteChampionById = (req, res, next) => {
    const data = {
        champion_id: res.locals.champion_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteChampionById:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message: `You successfully deleted the champion called (Champion Name : ${results[0][0].champion_name}.)`
            });
        }
    }
    championsModel.deleteByIdForChampions(data, callback);
}

////////////////////////////////////////////
//Controller to check existing champions to UPDATE
///////////////////////////////////////////
module.exports.checkExistingChampionsIdToUpdate = (req, res, next) => {

    const data = {
        champion_id: req.params.champion_id
    }

    const validate_champion = (error, results) => {
        if (error) {
            console.log("Error checkExistingChampion:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length == 0) {
                res.status(404).json({
                    message: "Your chosen champion to UPDATE is not in the champion list! Try another champion_id."
                });
            }
            else {
                res.locals.champion_id = data.champion_id;
                next();
            }
        }
    }
    championsModel.checkExistingChampionToUpdate(data, validate_champion)
}


////////////////////////////////////////////
//Controller to UPDATE Chmpions' Information
///////////////////////////////////////////
module.exports.updateChampionsById = (req, res, next) => {

    if (isNaN(req.body.basic_attack)) {
        res.status(400).json({
            message: `Basic Attack should be an Integer.`
        });
        return;
    }

    const data = {
        champion_id: res.locals.champion_id,
        champion_name: req.body.champion_name,
        basic_attack: req.body.basic_attack,
        ability_one: req.body.ability_one,
        ability_two: req.body.ability_two,
        ability_three: req.body.ability_three,
        champion_type: req.body.champion_type
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateChampionsById:", error);
            res.status(500).json(error);
        } else {
            const storedData = results[1][0];
            res.status(200).json({
                message: `You updated successfully for ID ${data.champion_id}.`,
                champion_name: storedData.champion_name,
                basic_attack: storedData.basic_attack,
                ability_one: storedData.ability_one,
                ability_two: storedData.ability_two,
                ability_three: storedData.ability_three,
                champion_type: storedData.champion_type
            });
        }
    }
    championsModel.updateChampionById(data, callback);
}

////////////////////////////////////////////
//Controller to Check required data
///////////////////////////////////////////
module.exports.checkForRequireData = (req, res, next) => {

    const { champion_name, basic_attack, ability_one, ability_two, ability_three, champion_type } = req.body

    if (!champion_name || !basic_attack || !ability_one || !ability_two || !ability_three || !champion_type) {
        res.status(400).json({
            message: "Missing required data to create a new champion."
        });
        return;
    }
    else if (isNaN(basic_attack)) {
        res.status(400).json({
            message: `Basic Attack should be an Integer.`
        });
    }
    else {
        next();
    }
}


////////////////////////////////////////////
//Controller to check existing champions Abilities Or Name to Create
///////////////////////////////////////////
module.exports.checkExistingChampionsAbilitiesAndNameToCreate = (req, res, next) => {

    const data = {
        champion_name: req.body.champion_name,
        ability_one: req.body.ability_one,
        ability_two: req.body.ability_two,
        ability_three: req.body.ability_three
    }

    const validate_challenge = (error, results) => {
        if (error) {
            console.log("Error checkExistingChampion:", error);
            res.status(500).json(error);
        }
        else {
            if (results.length != 0) {
                res.status(409).json({
                    message: "You cannot create a champion that already existed! Try to change the abilities or name."
                });
            }
            else {
                res.locals.champion_name = data.champion_name;
                res.locals.ability_one = data.ability_one;
                res.locals.ability_two = data.ability_two;
                res.locals.ability_three = data.ability_three;
                next();
            }
        }
    }
    championsModel.checkExistingChampionToCreate(data, validate_challenge)
}

////////////////////////////////////////////
//Controller to CREATE Champions' Information
///////////////////////////////////////////
module.exports.createNewChampion = (req, res, next) => {

    const data = {
        champion_name: res.locals.champion_name,
        basic_attack:  req.body.basic_attack,
        ability_one: res.locals.ability_one,
        ability_two: res.locals.ability_two,
        ability_three:  res.locals.ability_three,
        champion_type: req.body.champion_type
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewChampions:", error);
            res.status(500).json(error);
        } else {
            res.status(200).json({
                message: `You created a new champion successfully for ID ${results.insertId}.`,
                champion_name: data.champion_name,
                basic_attack: data.basic_attack,
                ability_one: data.ability_one,
                ability_two: data.ability_two,
                ability_three: data.ability_three,
                champion_type: data.champion_type
            });
        }
    }
    championsModel.insertSingle(data, callback);
}



