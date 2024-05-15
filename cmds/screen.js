const fs = require('fs');
exports.run = (client, message, args) => {
  let dozvoljen = false;
  var seks = require("../fivem");
  if (message.member.permissions.has("ADMINISTRATOR")) dozvoljen = true;
  let detectedack = false;

  if (!dozvoljen)
    return seks.embed("You are not authorized");

    fs.readFile('attacks.json', (err, data) => {
      let Tabela = JSON.parse(data);
      seks.embed('**Active Attacks**')

      for (let i = 0; i<Tabela.length;i++) { 
        if (Tabela[i].attacker) {
          seks.embed('Attacker : <@' + Tabela[i].attacker + '>\nHost : **' + Tabela[i].host + '**\nPort: **' + Tabela[i].port + '**\nMethod : **'+ Tabela[i].method + '**')
          detectedack = true
        }
      }

      setTimeout(function() {
        
        if (!detectedack)
        return seks.embed('No detected Attack');

      }, 200);
    })
};
  
  