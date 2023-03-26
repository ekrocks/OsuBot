const Banchojs = require("bancho.js");
const { id } = require("osu-api-extended/dist/utility/mods");


//requiring .env for credentials
require('dotenv').config();

//connecting to api 
const api_connect = require('./api-connector');

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

        client.on("PM", async({message, user}) => {
            console.log(`received message from ${user.ircUsername}`);
            // check if message was sent by ourselves
            if(user.ircUsername === process.env.banchoUSERNAME) return;

            //check for command prefix
            if(message[0] !== "!") return;

            const command = message.split(" ")[0].toLowerCase();
            
            //creating commands with the prefix ! followed by string
            switch(command) {
                case command_prefix + "hello":
                    return await user.sendMessage(`Hello there ${user.ircUsername}`);
                case command_prefix + "r":
                    return await user.sendMessage(`This feature will soon generate a random beatmap.`);
            }
        });

    }   catch (err) {
        console.error(err);
    }
};

startOsuBot();