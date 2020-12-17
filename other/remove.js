module.exports.run = (vbbot, msg, args) => {
    args.forEach(rName => {
      let role = msg.guild.roles.cache.find(r => r.name === rName.toString());
      if (role) {
        if (!msg.member.roles.cache.has(role.id)) return msg.channel.send("Vous n'avez pas le rôle !");

        msg.member.roles.remove(role)
          .then(m => msg.channel.send (`Vous ne possédez plus le rôle ${role}.`))
          .catch(e => console.log(e));
      } else {
        msg.channel.send("Vous ne pouvez pas retirer un rôle qui n'existe pas.")
      }
    });
};

module.exports.help = {
  name : 'remove',
  description: 'Supprimer un ou plusieurs rôles',
};