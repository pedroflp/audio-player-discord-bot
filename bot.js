const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const bot = new Discord.Client({disableEveryone: true});
const tempChannel = require("discord.js-temporary-channel");

 

client.on("ready", () =>{
    console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
//     // client.user.setActivity("Loinha", {
//     //   type: "STREAMING",
//     //   url: "https://www.twitch.tv/loinha"
//     // });

    // client.user.setActivity("tieri sem beat", { type : "LISTENING"});
    client.user.setStatus("online");
    
});

client.on("guildCreate", guild =>{
    console.log(`O bot entrou nos servidores: ${guild.name} (id: ${guild.id}). Polulação: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guild.size} servidores`);
});

client.on("guildDelete", guild =>{
    console.log(`O bot foi removido do servidor: ${guild.name} (id. ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("message", async message =>{

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === "cmd"){
      message.delete(1000).catch().catch
      let botcmds = new Discord.RichEmbed()
      .setDescription("**Comandos do Bot**")
      .setColor("#ffe417")
      .setThumbnail('https://i.imgur.com/vYc6jC8.gif')
      .addField("!lol", "Receba o cargo LOL e tenha acesso à sala privada do lol ☄️")
      .addField("!personalizada / !plol", "Recebe o link do site para criar os times de personalizada 🏹")
      .addField("!convite", "Envia o convite do discord 💌")
      .addField("!dlt", "Apagar mensagem ❌")
      .addField("!hino", "Recebe o link para ouvir o hino do TDC | **!playhino** toca o hino no canal conectado 🎵")
      .addField("!say *(only admin)*", "Enviar mensagem **como o bot** 🤖")

      return message.channel.send(botcmds).then(msg => msg.delete(15000));
    }

    if(comando === "dlt"){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("❌ Você não possui permissão para apagar mensagens!").then(msg => msg.delete(2000));
      message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`**${args[0]} mensagens excluídas.** ❌ `).then(msg => msg.delete(3000)).catch().catch;
      });
    }

    if(comando === "say"){
      message.delete(2000).catch().catch;
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ Você não tem permissão para executar esse comando!").then(msg => msg.delete(2000));
      let botmessage = args.join(" ");
      message.delete(2000).catch().catch;
      message.channel.send(botmessage);
    }

    if (comando === "igor" || comando === "iguin"){
      message.reply('Igor é um menino chato que eu tenho certeza que você não vai querer conhecer! Se puder mutar, ja muta, conselho de amigo')
    }

    if (comando === "hino" || comando === "hinotdc" || comando === "anthemtdc" || comando === "tdchino" || comando === "tdcanthem"){
      message.reply('https://clyp.it/w0ncj0sp. Se quiser ouvir a música digite **!playhino**');

    }

    if (comando === "playhino" || comando === "playhinotdc" || comando === "playanthemtdc" || comando === "playtdchino" || comando === "playtdcanthem") {
      message.delete(2000).catch().catch;
      var VC = message.member.voiceChannel;
      if (!VC)
          return message.reply("Conecte-se em um canal de voz!")
      VC.join()
      .then(connection => {
          const dispatcher = connection.playFile('TDC_Anthem.mp3');
          dispatcher.setVolume(0.2);
          dispatcher.on("end", end => {VC.leave()});
      })
      .catch(console.error);
      console.log('audio on')
    };


});

client.login(config.token);
