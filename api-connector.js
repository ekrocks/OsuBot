const {v2, auth} = require('osu-api-extended');
//import { Beatmap, user } from "nodesu";

require('dotenv').config();

const main = async () => {
    await auth.login(process.env.CLIENTID, process.env.CLIENTSECRET);

    const data = await v2.beatmap.diff(1256136) //test data 

    //console.log(data); //log test data

};

main();



const { tools } = require('osu-api-extended')

const tools_api = async () => {
  // Accuracy from hits
  const accuracy = tools.accuracy(300, 5, 10, 0, 0, 0, 'osu')

  // Country name from country code
  const country_name = tools.country('US')

  // Download difficulty file
  const diff_file = tools.download.difficulty(2379651, './', '2379651')

  // Calucalute pp for a difficulty
   const pp_calculate = tools.pp.calculate(2379651)

  // Rank letter form hits
  const rank = tools.rank(
    {
      geki: 236,
      katu: 43,
      300: 640,
      100: 54,
      50: 5,
      0: 15
    },
    'osu'
  )

  console.log({ accuracy, country_name, diff_file,pp_calculate ,rank })
}

tools_api()