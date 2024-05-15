const Discord = require("discord.js")
const Manager = new Discord.ShardingManager('./fivem.js');
Manager.spawn(2); 
