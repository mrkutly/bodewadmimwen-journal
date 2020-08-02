module.exports = {
	siteMetadata: {
		title: 'Bodéwadmimwen Journal',
		description: 'My notes as I learn Bodéwadmimwen',
		author: 'mrkutly',
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-styled-components`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `BodéwadmimwenJournal`,
				short_name: `Bodéwadmimwen`,
				start_url: `/`,
				background_color: `#FFEAAE`,
				theme_color: `#79ADDC`,
				display: `minimal-ui`,
				icon: `src/images/bear.svg`, // This path is relative to the root of the site.
			},
		},
	],
};
