const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,    //intents is set of permission that bot can use in order to get access a set of events
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {       //ready - it listens when our bot is ready 
    console.log(`${c.user.tag} is online`);
});

const roles = [
    {
        id : '1294276497019899956',
        label : 'Bot Dev'
    }
]

client.on('ready' ,async(c)=>{
    try{
        const channel = await client.channels.cache.get('1293563644726087825');
        if(!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach((role)=>{
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            )
        })
        await channel.send({
            content : 'claim',
            components : [row]
        });
        process.exit();
    }catch(error){
        console.log(error)
    }
})

client.login(process.env.TOKEN);

