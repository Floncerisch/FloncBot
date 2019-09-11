const Discord = require('discord.js');
const bot = new Discord.Client();

const token = process.env.token;

//start bot
bot.on('ready', () =>{
    console.log('This Bot is online!');
})

//Reaction Role
bot.on('raw', event => {
  console.log(event);
  const eventName = event.t;
  if(eventName === 'MESSAGE_REACTION_ADD')
  {
    if(event.d.message_id === ('620674035684081665') || event.d.message_id === ('621278940706897961'))
    {
      var reactionChannel = bot.channels.get(event.d.channel_id);
      if(reactionChannel.messages.has(event.d.message_id))
      return;
      else {
        reactionChannel.fetchMessage(event.d.message_id)
        .then(msg => {
          var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
          var user = bot.users.get(event.d.user_id);
          bot.emit('messageReactionAdd', msgReaction, user);
        })
       .catch(err => console.log(err));
      }
    }
  }
  else if(eventName === 'MESSAGE_REACTION_REMOVE')
      {
        if(event.d.message_id === '620674035684081665')
        {
          var reactionChannel = bot.channels.get(event.d.channel_id);
          if(reactionChannel.messages.has(event.d.message_id))
          return;
          else {
            reactionChannel.fetchMessage(event.d.message_id)
            .then(msg => {
              var msgReaction = msg.reactions.get(event.d.emoji.name + ":" + event.d.emoji.id);
              var user = bot.users.get(event.d.user_id);
              bot.emit('messageReactionRemove', msgReaction, user);
            })
          .catch(err => console.log(err));
     }
   }
  }
});

bot.on('messageReactionAdd', (messageReaction, user) => {
  var roleName = messageReaction.emoji.name;
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  if(role)
  {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);
    if (member)
    {
      member.addRole(role.id);
      console.log("Success.");
    }
  }
});

bot.on('messageReactionRemove', (messageReaction, user) => {
  var roleName = messageReaction.emoji.name;
  var role = messageReaction.message.guild.roles.find(role => role.name.toLowerCase() === roleName.toLowerCase());
  if(role)
  {
    var member = messageReaction.message.guild.members.find(member => member.id === user.id);
    if (member)
    {
      member.removeRole(role.id);
      console.log("Success. Removed Role.");
    }
  }
});

//AutoRole
bot.on('guildMemberAdd', member => {
    let memberRole = member.guild.roles.find("name", "User");
    member.addRole(memberRole);
  }
)

bot.login(token);
