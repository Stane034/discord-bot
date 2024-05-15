global.Discord = require("discord.js.old");
global.client = new Discord.Client();

global.config = require("./cmds/config/config.json");
global.package = require("./package.json");
global.servers = require('./auth/servers.json')
global.req = require('request');
global.notes = require("./auth/notes.json")
global.news = 'sShop';
global.modules = require("./modules")
global.log = require("./modules/log") 
global.Q3RCon = require('quake3-rcon');
global.rcondb = require("./auth/rcon.json");
global.crypto = require("crypto-js");
global.tempNatives = require("./auth/temp.json")
global.listNatives = require("./auth/names.json")

global.fs = require("fs");
global.dns = require('dns');
global.sleep = require("system-sleep");
global.createHash = require('hash-generator');
global.Fuse = require("fuse.js")
global.colors = require("colors")
global.state = config.title;
global.icon = config.slika;

const express = require('express');
global.set = new Set();
global.title = config.title;

global.prefix = config.prefix;

global.color = config.color;

global.premcolor = config.premcolor;

global.author = package.author;

client.on("message", message => {

  if (!message.content.startsWith(config.prefix)) return;
  if (set.has(message.author.id)) {
    message.delete();
    return zembed(`<@${message.author.id}>, wait 3 seconds before using any of the commands..`)
  }
  set.add(message.author.id)

  module.exports.zembed = (args, colour) => {
       
    let embed = new Discord.RichEmbed()
    .setDescription(args)
    .setColor(colour)
    message.channel.send({ embed: embed })
    .then(msg => {
        msg.delete(5000)
    })
    return;

}

module.exports.good = (args) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(state, icon)
    .addField("Uspesno.", args)
    .setColor('#1daf4c')
    .setThumbnail(icon)
    message.channel.send({ embed: embed })
    return;

}
module.exports.bad= (args) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(state, icon)
    .addField("Neuspesno.", args)
    .setColor('#e22424')
    .setThumbnail(icon)
    message.channel.send({ embed: embed })
    return;

}
module.exports.error = (args) => {

    let embed = new Discord.RichEmbed()
    .setAuthor(state, icon)
    .setDescription(args)
    .setColor('#e22424')
    .setThumbnail(icon)
    message.channel.send({ embed: embed })
    return;

}
module.exports.embed = (args) => {

    let embed = new Discord.RichEmbed()
    .setDescription(args)
    .setColor(color)
    message.channel.send({ embed: embed })
    return;
    

}
module.exports.num = (min, max) => {
return Math.floor(Math.random() * (max - min)) + min;
}
  

  function zembed(args) {
    let embed = new Discord.RichEmbed()
      .setDescription(args)
      .setColor(color)
    message.channel.send({ embed: embed })
      .then(msg => {
        msg.delete(5000)
      })
    return;
  }
  setTimeout(() => {
    set.delete(message.author.id)
  }, 3000)

  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  try {
    let commandFile = require(`./cmds/${command}.js`);

    commandFile.run(client, message, args);
  } catch (err) {

  }
});

client.on("ready", () => {
  var statuss = [``]
  setInterval(function start() {
    log(`(${client.user.username} Bot): ${colors.green(`Online.`)}`);
    
        var rand = statuss[Math.floor(Math.random() * statuss.length)];
        client.user.setActivity(`coded by: Stane`, { type: "Watching"});

    
    client.user.setStatus('dnd');

    return start;
  }(), 7000);
});


client.on("guildCreate", guild => {
  log(`(${config.title}): New guild joined: ${guild.name} (id: ${guild.id})`);

});

client.on("guildDelete", guild => {
  log(`(${config.title}): Removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  setInterval(function start() {
    let totalSeconds = (client.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    fs.writeFile('./modules/api.json', `
    {
    "ping": ${Math.round(client.ping)}, 
    "users": ${client.users.size}, 
    "servers": ${client.guilds.size}, 
    "uptime": ["${hours} hours", 
    "${minutes} minutes", "${seconds} seconds"], 
    "news_simplified": "${news}", 
    "news_html": "${news.html}"
    }`, 
    (err) => {
      if (err) { console.error(err) }
    });
    return start;
  }(), 600000);
});

let cache = []

fs.writeFile('attacks.json', JSON.stringify(cache), function(err){ 
  if (err) { 
    throw err;
  }
})

client.login(config.token);
