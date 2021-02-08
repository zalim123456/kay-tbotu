const Discord = require("discord.js");

const mapping = {
  " ": "   ",
   "0": "<a:sifir:807870492052422658>",
  "1": "<a:bir:807870486909681684>",
  "2": "<a:iki:807870492236054538>",
  "3": "<a:uc:807870492723380254>",
  "4": "<a:dort:807870492009824266>",
  "5": "<a:bes:807870490998997002>",
  "6": "<a:alti:807870487694016564>",
  "7": "<a:yedi:807870492496363550>",
  "8": "<a:sekiz:807870492362407996>",
  "9": "<a:dokuz:807870491813085206>",
  "!": "❕",
  "?": "❔",
  "#": "#️⃣",
  "*": "*️⃣"
};
let tags = 'Ϯ'
"abcdefghijklmnopqr".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

  
exports.run = function(client, message, args) {
  
  let offlinesayi = message.guild.members.filter(
    m => m.user.presence.status === "offline"
  ).size; 
  let offline = '**<a:sag:807874307795583036> Çevrimdışı Kişi** ' +
     `${offlinesayi}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")
  let toplam = message.guild.memberCount;
  let sunucu = '**Sunucudaki Kişi:** ' + 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  let online = message.guild.members.filter(m => !m.user.bot && m.user.presence.status !== "offline").size;;
  let offline2 =  '<a:sag:807874307795583036> **Çevrimiçi Kişi:** ' +
     `${online}`
     .split("")
     .map(c => mapping[c] || c)
     .join(" ")

  let tagsayi = message.guild.members.filter(m => m.user.username.includes(tags)).size
    let tag = '<a:sag:807874307795583036> **Tagdaki :** ' +
      `${tagsayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
const embed = new Discord.RichEmbed()
.setTitle('<a:elmas:807879506551111700> Sunucu İstatistikleri')
.setColor('BLACK')
.setDescription('' + sunucu + '\n \n' + offline2 + '\n \n' + offline + '\n \n'+ tag)
.setFooter('')

  message.channel.send(embed)
  let onnl = `**Toplam Üye:** ${sunucu}\n**Aktif Üye:** ${offline2}\n**Tagdaki Üye:** ${tag}`
message.channel.setTopic(onnl)

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
}; 