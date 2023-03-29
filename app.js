const Banchojs = require("bancho.js");
const { tools } = require("osu-api-extended");
const { id } = require("osu-api-extended/dist/utility/mods");

const fs = require ("fs/promises")

//require('dotenv').config();

// const return_search = () =>{
//     let beatmap = /https?:\/\/osu.ppy.sh\/b\/(\d{4,10})/i;
//     client.on("PM", async({message, user}) => {
//         console.log(`received message from ${user.ircUsername}`);
//         // check if message was sent by ourselves    
//         if (beatmap.test(message)){
            
//                 //returning beatmap data for later similar beatmap return
//                 let pp = await api_connect.pp_calculate(message.match(beatmap)[1])
//                 let search = await api_connect.v2.beatmap.search({tags: pp.data.tags})
//                 //({genre: pp.data.genre_id.name})
//                 return await user.sendmessage (search (limit,(3)))
//                 console.log(user.sendmessage)
//             //if (async, )

//         }
//     }
//}


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
                let beatmap = /https?:\/\/osu.ppy.sh\/b\/(\d{4,10})/i;
                if (beatmap.test(message)){
                
                    //returning beatmap data for later similar beatmap return
                    let pp = await api_connect.pp_calculate(message.match(beatmap)[1])
                    let search = await api_connect.v2.beatmap.search({tags: pp.data.tags})
                    //({genre: pp.data.genre_id.name})
                    //return await user.sendMessage (search)
                    console.log(search)
                    
                }     
            });
    
        }   catch (err) {
            console.error(err);
        }
    };
    
    startOsuBot(); 
}

    
    main()