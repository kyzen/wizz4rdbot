const Discord = require('discord.js');
const client = new Discord.Client();
var prefix = "-";

client.login('NTMyNjQ0MTA5ODQwNjc4OTEy.Dx0NBA.rw-CPbD-MWnH7X-JcytqYvHfjkk');

client.on('message', message =>{
    if(message.content === "-infobot"){
       message.reply("Mon nom est : Wizz4rd Bot , je suis crée et codé par Kyzen ツ depuis le 10/01/19");
    }
});

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':tada:  Bienvenue à **' + member.user.username + '** sur le discord ** ' + member.guild.name + '**')
        .setFooter('Membres actuels : ' + member.guild.memberCount)
    member.guild.channels.get('532639668219543602').send(embed)
    member.addRole('532641191003684866')
 
});
 
client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setDescription(':wave: **' + member.user.username + '** a quitté le serveur')
        .setFooter('Membres actuels : ' + member.guild.memberCount)
    member.guild.channels.get('532639668219543602').send(embed)
 
});

/*Kick*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(":x: **Erreur** ! Raison : Permissions manquante")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(":x: **Erreur** ! Raison : Aucun utilisateur mentionné ")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send(":x: **Erreur** ! Raison : Je ne peux pas exclure cet utilisateur")
       member.kick()
       message.channel.send(":white_check_mark: **"+member.user.username + '** a été exclu par **' + message.author.username + '**')
    }
});

/*Ban*/
client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(":x: **Erreur** ! Raison : Permissions manquantes")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send(":x: **Erreur** ! Raison : Aucun utilisateur mentionné ")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send(":x: **Erreur** ! Raison : Je ne peux pas bannir cet utilisateur ")
       message.guild.ban(member, {days: 7})
       message.channel.send(":white_check_mark: **"+member.user.username + '** a été banni par **' + message.author.username + '**')
    }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: **Erreur** ! Raison : Permissions manquantes")
        let count = args[1]
        if (!count) return message.channel.send(":x: **Erreur** ! Raison : veuillez indiquer un nombre de messages à supprimer")
        if (isNaN(count)) return message.channel.send(":x: **Erreur** ! Raison : nombre invalide")
        if (count < 1 || count > 100) return message.channel.send(":x: **Erreur** ! Raison : le nombre doit être compris entre 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: **Erreur** ! Raison : Permissions manquantes")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(":x: **Erreur** ! Raison : Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(':white_check_mark: **' + member + '** a été mute')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(':white_check_mark: **' + member + '**  a été mute')
            })
        }
    }
})
