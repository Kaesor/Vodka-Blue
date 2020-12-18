module.exports.run = (vbbot, msg, args) => {
  msg.channel.send('Pong !');
};

module.exports.help = {
  name : 'ping',
  aliases: ['ping'],
  category: 'administration',
  description: 'Renvoie le ping.',
  cooldown: 10,
  usage: '',
  isUserAdmin: false,
  permissions: false,
  args : false
};