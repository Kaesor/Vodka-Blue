const { MessageEmbed, MessageAttachment } = require("discord.js");
const diceImg = new MessageAttachment('./assets/img/supporter-vb.png');
const randomDice = () => Math.floor(Math.random() * 6) + 1;


module.exports.run = (vbbot, msg, args) => {
  const embed = new MessageEmbed()
  .setColor("#416669")
  .setTitle("Random Dice")
  .attachFiles(diceImg)
  .setThumbnail('attachment://supporter-vb.png')
  .addFields(
    { name : 'Dice #1', value: randomDice(), inline:true},
    { name : 'Dice #2', value: randomDice(), inline:true},
    { name : 'Dice #3', value: randomDice(), inline:true}
  )

  .addFields(
    { name : 'Dice #4', value: randomDice(), inline:true},
    { name : 'Dice #5', value: randomDice(), inline:true},
    { name : 'Dice #6', value: randomDice(), inline:true}
  )

  msg.channel.send(embed);
};

module.exports.help = {
  name : 'dice',
  description: 'Renvoie la valeur de plusieurs dés !',
};