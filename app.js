const Banchojs = require("bancho.js");
const { tools } = require("osu-api-extended");
const { id } = require("osu-api-extended/dist/utility/mods");

const fs = require ("fs/promises")

require('dotenv').config();

//requiring .env for credentials
require('dotenv').config();

//connecting to api 
const main = async() => {
    const api_connect =  await require('./api-connector')();

    //command prefix for chat commands
    const command_prefix = "!"
    
    const client = new Banchojs.BanchoClient({
        username: process.env.banchoUSERNAME, 
        password: process.env.banchoPASSWORD 
      
    });
    //console.log(process.env) // remove this after you've confirmed it is working
    //console.log(process.env.banchoUSERNAME)
    
    const startOsuBot = async () => {
        try{
            await client.connect();
            console.log("OsuBot Connected...");
    
            await api_connect
                console.log("Osubot connected to API.")
    
            client.on("PM", async({message, user}) => {
                console.log(`received message from ${user.ircUsername}`);
                // check if message was sent by ourselves
                if(user.ircUsername === process.env.banchoUSERNAME) return;
    
                //check for command prefix
                //if(message[0] !== "!")return return_search;
    
                const command = message.split(" ")[0].toLowerCase();
                
                //creating commands with the prefix ! followed by string
                switch(command) {
                    case command_prefix + "hello":
                        return await user.sendMessage(`Hello there ${user.ircUsername}`);
                    case command_prefix + "r":
                        return await user.sendMessage(`This feature will soon generate a random beatmap.`);
                }
                let beatmap = /https?:\/\/osu.ppy.sh\/beatmapsets\/(\d{4,})#?\/(\d{4,})/i;
                console.log(message)
                if (beatmap.test(message)){
                
                    //returning beatmap data for later similar beatmap return

                    let pp = await api_connect.pp_calculate(message.match(beatmap)[2])
                    let ppDifficulty = pp.stats.star.pure
                    let search = await api_connect.v2.beatmap.search({genre_id: pp.data.genre_id})
                    
                    //log 
                    console.log(search.beatmapsets[0])
                    console.log(message)
                    
                    //TODO: instead of picking the first beatmapset, pick out random beatmap from the search.beamapsets array

                    let exBeatMap = search.beatmapsets[0]
                    let possiblebeatMaps = exBeatMap.beatmaps.filter(({difficulty_rating}) => { //beatmap.difficulty_rating -> difficulty_rating 
                        if(difficulty_rating == ppDifficulty)
                        {
                            return true
                        }
                        else if (Math.abs(difficulty_rating - ppDifficulty) <= 2.0) //ex. rating 4 will return rating 2~6
                        {
                            return true
                        }
                        else
                        {
                            return false
                        }
                    }).map(({url}) => url)
                    
                    let totalMaps = possiblebeatMaps.length
                    let finalMapChosen = Math.floor(Math.random() * totalMaps)

                    //return beatmap url similar in difficulty to linked map
                    let beatmapURL = await user.sendMessage(possiblebeatMaps[finalMapChosen])

                    
                
                    
                    
                }     
            });
    
        }   catch (err) {
            console.error(err);
        }
    };
    
    startOsuBot(); 
}

    
    main()