const { MessageEmbed } = require("discord.js");

module.exports.run = async (vbbot, msg, args) => {
  let user = msg.guild.member(msg.mentions.users.first());
  if(isNaN(args[1]) || (args[1] < 1 || args[1] > 100)) return msg.reply('Il faut spécifier un **nombre** entre 1 et 100 !');

  const messages = (await msg.channel.messages.fetch({
    limit: 100,
    before: msg.id,
  })).filter(a => a.author.id === user.id).array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user) return msg.reply('Aucun messages à supprimer ou cet utilisateur n\'existe pas.');

  if (messages.length === 1) await messages[0].delete();
  else await msg.channel.bulkDelete(messages);
  msg.delete();

  const embed = new MessageEmbed()
    .setAuthor(msg.author.username, msg.author.avatarURL())
    .setColor("#dc143c")
    .setDescription(`**Action** : prune\n**Nombre de mesages**: ${args[1]}\n**Utilisateur** : ${args[0]}`)
  vbbot.channels.cache.get('789526260560822283').send(embed);
};

module.exports.help = {
  name : 'prune',
  aliases: ['prune'],
  category: 'administration',
  description: 'Purge un nombre de messages spécifié sur un utilisateur',
  cooldown: 10,
  usage : '<@utilisateur> <nombre>',
  isUserAdmin: true,
  permission: true,
  args : true
};