const {v2, auth, tools} = require('osu-api-extended');
//import { Beatmap, user } from "nodesu";

require('dotenv').config();

const main = async () => {
    await auth.login(process.env.CLIENTID, process.env.CLIENTSECRET);

    const pp_calculate = tools.pp.calculate
    
    return {pp_calculate, v2}
    
    //You hate trans women because theyre trans, I hate trans women because theyre women. 
    //Trans inclusive radical mysoginy, theres a better way to hate. :)
};

module.exports = main