exports.run = (client, message, args) => {
    let dozvoljen = false;
    var seks = require("../fivem");
    if (message.member.permissions.has("ADMINISTRATOR")) dozvoljen = true;
   
  
    if (!dozvoljen)
      return seks.embed("You are not authorized");
  
    const napisiga = args.join(" "); 
    message.delete().catch(O_o => {}); 
    message.channel.send(napisiga);
  };
  
  