const { MessageEmbed } = require("discord.js");

module.exports.run = (vbbot, msg, args) => {
  const user = msg.mentions.users.first();
  const reason = (args.splice(1).join(' ') || 'Aucune raison spécifiée.');
  user ? msg.guild.member(user).ban({days:7, reason:`${reason}`}) : msg.channel.send("L'utilisateur n'existe pas !");

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`)
    .setColor("#dc143c")
    .setDescription(`**Action** : ban\n**Raison** : ${reason}`)
    .setThumbnail(user.avatarURL())
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  // const log_channel = vbbot.channels.cache.get('789526260560822283');
  // log_channel.send(embed);
  vbbot.channels.cache.get('789526260560822283').send(embed);
};

module.exports.help = {
  name : 'ban',
  aliases: ['ban'],
  category: 'administration',
  description: 'Ban un utilisateur',
  cooldown: 10,
  usage : '<@utilisateur> <raison>',
  isUserAdmin: true,
  permission: true,
  args : true
};