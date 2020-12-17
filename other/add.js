module.exports.run = (vbbot, msg, args) => {
  args.forEach(rName => {
    let role = msg.guild.roles.cache.find(r => r.name === rName.toString());
    if (role) {
      if (msg.member.roles.cache.has(role.id)) return msg.channel.send("Vous avez déjà ce rôle ! Essayez un autre !");
      if(role.permissions.has('KICK_MEMBERS')) return msg.channel.send("Vous ne pouvez pas avoir ce rôle !");

      msg.member.roles.add(role)
        .then(m => msg.channel.send (`Vous possédez maintenant le rôle ${role}.`))
        .catch(e => console.log(e));
    } else {
      msg.channel.send("Le rôle n'existe pas.")
    }
  });
};

module.exports.help = {
  name : 'add',
  description: 'Ajouter un ou plusieurs rôles',
};