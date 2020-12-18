const { MessageManager } = require("discord.js");

module.exports.run = (vbbot, msg, args) => {
  msg.channel.send(args.join(" "));
};

module.exports.help = {
  name : 'say',
  aliases: ['repeat', 'rep', 'dit'],
  category: 'misc',
  description: 'Répète le message d\'un utilisateur',
  cooldown: 10,
  usage : '<votre_message>',
  isUserAdmin: false,
  permission: false,
  args : true
};