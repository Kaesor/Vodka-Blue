const { MessageEmbed } = require("discord.js");

module.exports.run = async (vbbot, msg, args) => {
  let user = await vbbot.users.fetch(args[0]);
  if(!user) return msg.reply("L'utilisateur n'existe pas !");
  msg.guild.members.unban(user);

  const embed = new MessageEmbed()
    .setAuthor(`${user.username} (${user.id})`, user.avatarURL())
    .setColor("#dc143c")
    .setDescription(`**Action** : unban`)
    .setTimestamp()
    .setFooter(msg.author.username, msg.author.avatarURL())

  // const log_channel = vbbot.channels.cache.get('789526260560822283');
  // log_channel.send(embed);
  vbbot.channels.cache.get('789526260560822283').send(embed);
};

module.exports.help = {
  name : 'unban',
  aliases: ['unban'],
  category: 'adminstration',
  description: 'Unban un utilisateur',
  cooldown: 10,
  usage : '<utilisateur_id>',
  isUserAdmin: false,
  permission: true,
  args : true
};