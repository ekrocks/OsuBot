const {v2, auth} = require('osu-api-extended');
//import { Beatmap, user } from "nodesu";

require('dotenv').config();

const main = async () => {
    await auth.login(process.env.CLIENTID, process.env.CLIENTSECRET);

    const data = await v2.beatmap.diff(1256136) //test data 

    console.log(data); //log test data

};

main();