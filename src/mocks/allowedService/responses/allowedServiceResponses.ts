export const ALLOW_RES = {
	GET_SETS: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: [
			{
				name: 'khyojun 1',
				colorCode: 'bg-color-palette-red',
				allowSitesIcon: [
					'https://www.google.com/s2/favicons?domain=google.com',
					'https://www.google.com/s2/favicons?domain=naver.com',
				],
			},
		],
	},

	GET_SETS_DETAIL: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: [
			{
				id: '3',
				name: 'khyojun 1',
				colorCode: 'bg-color-palette-red',
				allowedSites: [
					{
						siteIcon: 'https://www.google.com/s2/favicons?domain=naver.com',
						siteUrl: 'https://www.naver.com/',
					},
				],
			},
		],
	},

	GET_RECOMMEND_SERVICES: {
		status: 200,
		message: '요청이 성공했습니다.',
		data: {
			recommendServices: [
				{ serviceName: 'naver', serviceUrl: 'https://www.naver.com' },
				{ serviceName: 'tailwind', serviceUrl: 'https://tailwindcss.com' },
				{ serviceName: 'github', serviceUrl: 'https://github.com' },
				{ serviceName: 'google', serviceUrl: 'https://www.google.com' },
				{ serviceName: 'youtube', serviceUrl: 'https://www.youtube.com' },
				{ serviceName: 'notion', serviceUrl: 'https://www.notion.so' },
				{ serviceName: 'naver', serviceUrl: 'https://www.naver.com/1332' },
				{ serviceName: 'tailwind', serviceUrl: 'https://tailwindcss.com/Q4' },
				{ serviceName: 'github', serviceUrl: 'https://github.com/ADFADS' },
				{ serviceName: 'google', serviceUrl: 'https://www.google.com/ADFDAFS' },
				{ serviceName: 'youtube', serviceUrl: 'https://www.youtube.com/ADFASF' },
				{ serviceName: 'notion', serviceUrl: 'https://www.notion.so/ASDF' },
			],
		},
	},
};
