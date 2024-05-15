const fetch = require("node-fetch")
const https = require("https")

exports.run = (client, message, args) => {
    var seks = require("../fivem");

    if (!args[0])
      return seks.embed('[server id]')  
    let link = args[0]
    let apiURL = 'https://servers-frontend.fivem.net/api/servers/single/' + link
    var headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.3",
    }
    https.get(apiURL, function(res) {
        if(res.statusCode == 404){
            seks.embed('Invalid code')
        }else{
            fetch(apiURL, { headers: headers })
            .then(res => res.json())
            .then((out) => {
                let IP = out["Data"]["connectEndPoints"][0];
                seks.embed('**FiveM IP**\nRequested By : <@' + message.author.id + '>\nServer ID : **' + link +'**\nIP : **' + IP + '**')
            }).catch(() => {
                seks.embed('Error')
            })
        } 
    })
};
  
  