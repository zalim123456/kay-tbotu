
const Discord = require('discord.js');

const db = require('quick.db')

exports.run = async (client, message, args) => {

  let rol1 = "807714812023930911" 
  let alrol = "807714811034992661"
  let unreg = "807714866780569610"
  let kisi = message.mentions.members.first() || client.users.get(args[0]) || message.guild.members.get(args[0])
  
   if(!message.member.roles.has("807714781821665292")) return message.channel.send("Yetkin yok üzgünüm")
 
    if(!kisi) return message.channel.send("Kaydını İptal Ediceğiniz kişiyi etiketleyin")


  message.channel.send("Başarı ile Kaydı İptal Edildi.");

  

  kisi.removeRole(message.guild.roles.get(rol1));
kisi.removeRole(message.guild.roles.get(alrol));
  
  kisi.addRole(message.guild.roles.get(unreg));
   


}

exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: ["kayıt-iptal"],

  permLevel: 0

}

exports.help = {

  name: "kayıtiptal",

  description: "Kayıt olmanızı sağlar.",

  usage: "kayıt-ol"

}