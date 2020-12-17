const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const { readdirSync } = require("fs");

const vbbot = new Client();
// vbbot.commands, vbbot.cooldowns
["commands", "cooldowns"].forEach(x => vbbot[x] = new Collection());


// Recupération des différents fichiers de commandes
const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      vbbot.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée : ${getFileName.help.name}`);
    };
  });
};
// Lancement de la fonction de récupération des fichiers de commandes
loadCommands();

vbbot.on('message', msg => {
  // Vérification de la commande
    if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
    const args = msg.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    // Vérification avec aliases
    const command = vbbot.commands.get(commandName) || vbbot.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if (!command) return;

  // Verification des arguments
    if (command.help.args && !args.length) {
      let noArgsReply = `Il nous faut des arguments pour cette commande, ${msg.author}`;
      if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande : \`${PREFIX}${command.help.name} ${command.help.usage}\``
      return msg.channel.send(noArgsReply);
    }

  // Vérification du cooldown
    if (!vbbot.cooldowns.has(command.help.name)) {
      vbbot.cooldowns.set(command.help.name, new Collection());
    }
    const timeNow = Date.now();
    const tStamps = vbbot.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;
    // Calcul du temps
    if (tStamps.has(msg.author.id)) {
      const cdExpirationTime = tStamps.get(msg.author.id) + cdAmount;
      // Temps restant
      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        return msg.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de réutiliser la commande \`${command.help.name}\`.`);
      }
    }
    // Ajout de l'utilisateur dans la collection
    tStamps.set(msg.author.id, timeNow);
    // Utilisateur supprimé suite au temps restant
    setTimeout(() => tStamps.delete(msg.author.id), cdAmount);


  // Lancement des commandes
    command.run(vbbot, msg, args);
});


// Connexion du bot
vbbot.on('ready', () => {console.log(`${vbbot.user.tag} bien connecté !`);});
vbbot.login(TOKEN);
