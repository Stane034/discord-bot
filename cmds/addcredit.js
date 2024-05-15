exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let dbd = require('../fivem');
    if (message.member.permissions.has("BAN_MEMBERS", false, false)) allowed = true;
    if (!allowed) return dbd.embed("You do not have permission to use this command!");
    let member = message.mentions.members.first();  
    if (!member) return dbd.embed("Mark the correct member of this server!");
    let ID = member.id
    if (!args[1]) return dbd.embed("[tag] [attacks]") 
    let attacks = parseInt(args[1])
    let pronadjen = false
    fs.readFile('whitelisted.json', (err, data) => {
        if (err) throw err;
        let Tabela = JSON.parse(data)
        for (let i = 0; i < Tabela.length; i++) { 
            if (Tabela[i].discord == ID) { 
                Tabela[i].attacks = Tabela[i].attacks + attacks
                fs.writeFile("whitelisted.json", JSON.stringify(Tabela), (err) => {
                    if (err)
                    console.log(err);
                    else {
                        dbd.embed("**Successfully**\n**Member** : " + member + "\n**Current Attacks** : " + Tabela[i].attacks)
                        pronadjen = true
                        return
                    }
                });
            }
        }

    });

};
  
  