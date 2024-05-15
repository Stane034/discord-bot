exports.run = async (client, message, args) => {
    let allowed = false;
    let allowed2 = false;
    let dbd = require('../fivem');
    if (message.member.permissions.has("BAN_MEMBERS", false, false))
      allowed = true;
  
    if (!allowed)
      return dbd.embed("You do not have permission to use this command!");
  
    let member = message.mentions.members.first();
  
    if (!member)
      return dbd.embed("Mark the correct member of this server!");
  
    if (member.permissions.has("MANAGE_MESSAGES") && !allowed2)
      return dbd.embed("That member belongs to STAFF!");
  
    if (!member.bannable)
      return dbd.embed(
        "I can't ban this member! Maybe he/she has a bigger role or I don't have permission for this function!"
      );
  
    let reason = args.slice(1).join(" ");
  
    if (!reason) reason = "Type reason.";
  
    await member
      .ban(reason)
  
      .catch(error =>
        dbd.embed(
          `Im sorry, ${message.author}. I could not ban this member because: ${error}`
        )
      );
  
    dbd.embed(
      `${member.user.tag} was banned by ${message.author.tag} reason: ${reason}`
    );
  };
  
  