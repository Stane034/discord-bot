const axios = require('axios');

exports.run = (client, message, args) => {
    let dozvoljen = false;
    var seks = require("../fivem");
    
    if (message.member.permissions.has("ADMINISTRATOR")) dozvoljen = true;
    
    if (!dozvoljen)
      return seks.embed("You are not authorized");
    if (!args[0])
      return seks.embed('[link]')  
    
    let link = args[0]
    
    let apiURL = 'http://ip-api.com/json/' + link
    axios
     .get(apiURL)
     .then((response) => {
        const Tabela = response.data;
        let IP = Tabela.query
        let Regija = Tabela.country + '(' + Tabela.countryCode + ')'
        let ISP = Tabela.isp 
        let Organizacija = Tabela.org

        seks.embed('**IP Info**\nRequested By : <@' + message.author.id + '>\nIP : **' + IP + '**\nRegion : **' + Regija + '**\nISP : **' + ISP + '**\nOrg: **' + Organizacija + '**')
     })
};
