const db = require('quick.db');

const Discord = require('discord.js')

exports.run = function(client, message, args) {
let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")
const embed = new Discord.RichEmbed()
            .setColor('BLUE')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Tasia')
            .setTimestamp()
        message.channel.send(embed)

}
exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0

};

exports.help = {

  name: 'isimler',
///buraları ayarlarsın
  description: 'description',

  usage: 'usage'

};