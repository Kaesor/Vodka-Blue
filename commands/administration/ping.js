module.exports.run = (vbbot, msg, args) => {
  msg.channel.send('Pong !');
};

module.exports.help = {
  name : 'ping',
  aliases: ['ping'],
  description: 'Renvoie le ping.',
  cooldown: 10,
  usage: '',
  args : false
};