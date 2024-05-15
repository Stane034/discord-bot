const { Util } = require("discord.js");
var ses = require("../fivem");

exports.run = async (client, message, args) => {
  let allowed = false;
  if (message.member.permissions.has("MANAGE_MESSAGES", false, false))
    allowed = true;

  if (!allowed)
    return message.channel.send("You are not authorized!");

  let deleteCount = parseInt(args[0], 10); 
  if (!deleteCount || deleteCount < 1 || deleteCount > 100)
    return message.reply("(1-100).");


  message.channel
    .bulkDelete(deleteCount)
    .then(async () => {
      let msg = "poruke";
      if (deleteCount != 100) deleteCount--;
      if (deleteCount == 1) msg = "poruku";
      ses.embed(`<@${message.author.id}>, deleted**` + deleteCount + `** messages.`)
    })

    .catch(error =>
      message.reply(`API Error: ${error}`)
    );
};
