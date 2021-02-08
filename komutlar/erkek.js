const db = require('quick.db');
const Discord = require('discord.js')

exports.run = function(client, message, args) {
          let embed = new Discord.RichEmbed().setAuthor(message.member.displayName, message.author.avatarURL).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Tasia');
        let embed2 = new Discord.RichEmbed().setAuthor(message.member.displayName, message.author.avatarURL).setColor('#640032').setTimestamp().setThumbnail(message.author.avatarURL).setFooter(' Tasia');
 
        if (!client.config.mods.some(id => message.member.roles.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }
       
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
     
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))
 
        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!"))
 
       
        message.guild.members.get(member.id).setNickname(`Ϯ ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`${name} | ${age}\` (<@&807714812023930911>)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        message.guild.members.get(member.id).removeRole(`807714866780569610`)
        message.guild.members.get(member.id).addRole(`807714812023930911`)
        message.channel.send(embed2.setDescription(`${member} adlı kullanıcı\`${name} | ${age}\` isminde  kayıt edildi! (<@&807714812023930911>)`)
 
        )
 db.add(`kayıtsayı_${message.author.id}`, 1)

}
exports.conf = {
 
  enabled: true,
 
  guildOnly: false,
 
  aliases: [],
 
  permLevel: 0
 
};
 
exports.help = {
 
  name: 'e',
////buraları ayarlarsın isim falan
  description: 'description',
 
  usage: 'usage'
 
};