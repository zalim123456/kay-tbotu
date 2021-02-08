const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

require("./util/eventLoader")(client);

client.login(process.env.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.token);


//////////////////////////////

////----------------------- CONFİG KISMI -----------------------\\\\
client.config = {
    vipRoles: ['807714809427918858'], //vip
    unregisteres: ['807714866780569610'], // kayıtsız
    maleRoles: ['807714812023930911'], // erkek
    girlRoles: ['807714811034992661'], // bayan
    mods: ["807714781821665292"], // yetkili
    channelID: '807714901879291944', // kayıt kanalı
    yönetim: ['807714781821665292'] // üst yönetim
}
////----------------------- PREFİX KISMI -----------------------\\\\

/// - KAYIT KOMUDUNUZA:
client.on("message", async msg => {
  
var sayı = db.fetch(`rsayi_${msg.guild.id}`) || 0
  var anahtar = await db.fetch(`reklamengel_${msg.guild.id}`);
  if(anahtar === "acik"){
    const linkler = [
"http",
"https",
".com",
".net",
".xyz",
".tk",
".io",
".org",
".cf",
".ml",
".qa",
".club",
".gg",
"discord.gg/"];
    if(linkler.some(link => msg.content.includes(link))){
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
          msg.delete()
        
        db.add(`rsayi_${msg.guild.id}`, 1)
if(sayı == 3) return msg.guild.members.get(msg.author.id).ban()
  
        }
    }
    
  }
  if(!anahtar) return;
} )



/////////////////////////////

client.on("ready", () => {
  client.channels.get("807714877749592075").join();
})


////////////////////////////



client.on('message', msg => {
  if (msg.content.toLowerCase() === 'tag') {
      msg.channel.send('Ϯ');
}
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '.tag') {
      msg.channel.send('Ϯ');
}
});

///////////////////////



////Tag alana rol verme///

client.on("userUpdate", async(eski, yeni) => {
  if(eski.username !== yeni.username) {
  if(!yeni.username.includes("Ϯ")) {
     client.guilds.get("807714151177650246").members.get(yeni.id).removeRole(`807714808526929980`)                                 
     client.channels.get('807714986071162900').send(`:broken_heart: ${yeni}, TAG tagını çıkardığı İçin Family Rolünü Kaybetti`)
    }
     if(yeni.username.includes("Ϯ")) {
      client.channels.get('807714986071162900').send(`:heart: ${yeni}, TAG tagını aldığı İçin Family Rolü Kazandı Teşekkürler`)
      client.guilds.get("807714151177650246").members.get(yeni.id).addRole(`807714808526929980`)//rol ıd
     }
  }
  })

///tag alana rol verme///
client.on('guildMemberAdd', async member => {
   await member.addRole(`807714866780569610`) //id yazan yere verilecek rol (unregistered)
   await member.setNickname(`Ϯ İsim | Yaş`) //yeni gelen kullanıcının adını değiştirme
let member2 = member.user 
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2 
var takizaman = [];
if(zaman < 1296000) {
takizaman = 'Tehlikeli ❌'
} else {
takizaman = ` Güvenli ✅`}require("moment-duration-format");
  let zaman1 = new Date().getTime() - user.createdAt.getTime()
  const gecen = moment.duration(zaman1).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
  let message = member.guild.channels.find(x => x.id === `807714901879291944`) //id yazan kısma kanal id'si [orn: register-chat]
   const taki = new Discord.RichEmbed()
 
message.send(`<a:elmass:807869978325286923> Tasia Sunucumuza Hoş geldin ${member} 

          <a:elmass:807869978325286923>  Seninle Beraber **${message.guild.memberCount}** Kişiyiz.

          <a:elmass:807869978325286923> <@&807714781821665292> Rolündeki Yetkililer Seninle İlgilenecektir.

          <a:elmass:807869978325286923> Bize Destek Olmak İstersen Tag Alabilirsin

<a:elmass:807869978325286923> Hesabınız **${gecen}** Tarhinde Açılmış
<a:elmass:807869978325286923> Bu Kullanıcı: **${takizaman}**`)
          });