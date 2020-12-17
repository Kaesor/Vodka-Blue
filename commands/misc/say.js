const { MessageManager } = require("discord.js");

module.exports.run = (vbbot, msg, args) => {
  msg.channel.send(args.join(" "));
};

module.exports.help = {
  name : 'say',
  aliases: ['repeat', 'rep', 'dit'],
  description: 'Répète le message d\'un utilisateur',
  cooldown: 10,
  usage : '<votre_message>',
  args : true
};