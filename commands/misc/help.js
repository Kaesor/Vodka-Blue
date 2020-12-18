const { MessageEmbed } = require("discord.js");
const { PREFIX } = require("../../config.js");
const { readdirSync } = require("fs");
const categoryList = readdirSync('./commands');

module.exports.run = (vbbot, msg, args) => {
  if (!args.length) {
    const embed = new MessageEmbed()
    .setColor("#00e6e6")
    .addField("Liste des commandes", `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'information sur une commande, tapez \`${PREFIX}help <nom_commande>\`.`)

    for (const category of categoryList) {
      embed.addField(
        `${category}`,
        `${vbbot.commands.filter(cat => cat.help.category === category).map(cmd => cmd.help.name).join(', ')}`
      )
    }
    return msg.channel.send(embed);
  } else {
    const command = vbbot.commands.get(args[0]) || vbbot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
    if (!command) return msg.reply("Cette commande n'existe pas !");

    const embed = new MessageEmbed()
    .setColor('#00e6e6')
    .setTitle(`\`${command.help.name}\``)
    .addField("Description", `${command.help.description} (cd: ${command.help.cooldown} secs)`)
    .addField("Utilisation", command.help.usage ? `${PREFIX}${command.help.name} ${command.help.usage}` : `${PREFIX}${command.help.name}`, true)
    if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
    return msg.channel.send(embed);
  }
};

module.exports.help = {
  name : 'help',
  aliases: ['help', 'aide'],
  category: 'misc',
  description: 'Renvoie une liste de commande  ou les informations sur une seule.',
  cooldown: 3,
  usage : '<nome_commande>',
  isUserAdmin: false,
  permission: false,
  args : false
};