const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});



client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hello') {
        message.reply('hello');
    }
});

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName);
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;
        interaction.reply(`sum is ${num1 + num2}`);
    }
    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("embed title")
            .setDescription("this is description")
            .setColor('Random')
            .addFields({ name: "field title", value: "random value", inline: true });
        interaction.reply({ embeds: [embed] });
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle("embed title")
            .setDescription("this is description")
            .setColor('Random')
            .addFields({ name: "field title", value: "random value", inline: true });
        message.reply({ embeds: [embed] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
        await interaction.reply({
            content: "Cannot find the role.",
            ephemeral: true
        });
        return;
    }

    await interaction.deferReply({ ephemeral: true }); // Defer the reply

    const hasRole = interaction.member.roles.cache.has(role.id);
    if (hasRole) {
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role.name} has been removed.`);
    } else {
        await interaction.member.roles.add(role);
        await interaction.editReply(`The role ${role.name} has been added.`);
    }
});

eventHandler(client);


client.login(process.env.TOKEN);
