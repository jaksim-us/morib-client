require('dotenv').config();

const config = {
	appId: 'com.morib.app',
	productName: 'Morib',
	directories: {
		buildResources: 'build',
		output: 'dist/electron',
	},
	files: ['dist/**/*', 'src/main.cjs', 'package.json'],
	extraMetadata: {
		main: './src/main.cjs',
		author: {
			name: 'Kangmin Kim',
			email: 'rkdals0203@gmail.com',
		},
		description: 'Morib Desktop Application',
	},
	artifactName: '${productName}-${os}-${arch}-latest.${ext}',
	win: {
		target: [
			{
				target: 'nsis',
				arch: ['x64'],
			},
		],
	},
	linux: {
		target: [
			{
				target: 'AppImage',
				arch: ['x64'],
			},
		],
		category: 'Utility',
	},
	mac: {
		target: [
			{
				target: 'dir',
				arch: ['arm64', 'x64'],
			},
		],
		hardenedRuntime: true,
		gatekeeperAssess: false,
		entitlements: 'build/entitlements.mac.plist',
		entitlementsInherit: 'build/entitlements.mac.plist',
		provisioningProfile: 'build/MoribDevelopment.provisionprofile',
		identity: 'Mac Developer: Kangmin Kim (2T6M6KP853)',
		strictVerify: false,
	},
	nsis: {
		oneClick: false,
		allowToChangeInstallationDirectory: true,
		createDesktopShortcut: true,
		createStartMenuShortcut: true,
	},
	publish: {
		provider: 'github',
		private: true,
		releaseType: 'release',
	},
	afterSign: 'scripts/notarize.js',
	forceCodeSigning: true,
};

module.exports = config;
