exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let dbd = require('../fivem');
    if (message.member.permissions.has("BAN_MEMBERS", false, false)) allowed = true;
    if (!allowed) return dbd.embed("You do not have permission to use this command!");
    let member = message.mentions.members.first();  
    if (!member) return dbd.embed("Mark the correct member of this server!");
    
    let ID = member.id

    fs.readFile('whitelisted.json', (err, data) => {
        proslatabla = JSON.parse(data)
                   
        let ffData = {
            discord : ID,
            attacks : 0
        }
    
        for (let i = 0; i<proslatabla.length; i++) {
            if (proslatabla[i].discord == ID) { 
                return dbd.embed("User has account yet.")
            }
        }


        proslatabla.push(ffData)
    
        fs.writeFile("whitelisted.json", JSON.stringify(proslatabla), (err) => {
            if (err) 
                console.log(err);
            else {
                dbd.embed("**Successfully Created Account**\n**Member** : " + member)
            }
        });
    });


};
  
  