module.exports.run = (vbbot, msg, args) => {
    const user_mention = msg.mentions.users.first();
    msg.channel.send(`Le tag de la personne est : ${user_mention.tag}.`);
};

module.exports.help = {
  name : 'userinfo',
  description: 'Renvoie le nom de l\'utilisateur mentionné.',
};