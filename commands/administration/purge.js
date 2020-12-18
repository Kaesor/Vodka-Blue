const { MessageEmbed } = require("discord.js");

module.exports.run = async (vbbot, msg, args) => {
  if(isNaN(args[0]) || (args[0] < 1 || args[0] > 100)) return msg.reply('Il faut spécifier un **nombre** entre 1 et 100 !');

  const messages = await msg.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: msg.id,
  });
  msg.delete();
  await msg.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(msg.author.username, msg.author.avatarURL())
    .setColor("#dc143c")
    .setDescription(`**Action** : purge\n**Nombre de mesages**: ${args[0]}\n**Salon** : ${msg.channel}`)

  // const log_channel = vbbot.channels.cache.get('789526260560822283');
  // log_channel.send(embed);
  vbbot.channels.cache.get('789526260560822283').send(embed);
};

module.exports.help = {
  name : 'purge',
  aliases: ['purge'],
  category: 'administration',
  description: 'Purge un nombre de messages spécifié',
  cooldown: 10,
  usage : '<nombre>',
  isUserAdmin: false,
  permission: true,
  args : true
};