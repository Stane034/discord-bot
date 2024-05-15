exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let dbd = require('../fivem');
    let ID = message.author
    fs.readFile('whitelisted.json', (err, data) => {    
        proslatabla = JSON.parse(data)
        for (let i = 0; i<proslatabla.length; i++) {
            if (proslatabla[i].discord == ID.id) { 
                dbd.embed('**Account Data**\n**Owner** :' + ID + '\n**Credit** :' + proslatabla[i].attacks + '')
            }
        }
    });
};
  
  