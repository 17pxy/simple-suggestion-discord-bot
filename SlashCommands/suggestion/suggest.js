const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Suggest command",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'suggestion',
            description: 'Suggestion',
            type: 'STRING',
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */


    run: async (client, interaction, args) => {        

        const suggestion = interaction.options.getString("suggestion");

        const embed = new MessageEmbed()
        .setColor('YELLOW')
        .setAuthor({ name: `${interaction.user.tag} Suggestion`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setDescription(`New suggestion received!\n\n**Suggestion:**\n> ${suggestion}`)
        .setThumbnail(interaction.user.displayAvatarURL())
        
        client.channels.cache.get(client.config.suggestionChannel).send({ embeds: [embed] }).then(s => {
            interaction.reply({ content: 'Suggestion sent successfully', ephemeral: true})
            s.react('✅');
            s.react('❌');
        })

    },
};
