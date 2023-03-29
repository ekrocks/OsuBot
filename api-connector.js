const {v2, auth, tools} = require('osu-api-extended');
//import { Beatmap, user } from "nodesu";

require('dotenv').config();

const main = async () => {
    await auth.login(process.env.CLIENTID, process.env.CLIENTSECRET);

    const pp_calculate = tools.pp.calculate
    
    return {pp_calculate, v2}
    
};

module.exports = main