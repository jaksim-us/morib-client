require('dotenv').config();

const config = {
	appId: 'com.morib.app',
	productName: 'Morib',
	directories: {
		output: 'release',
		buildResources: 'build',
	},

	// 배포 시 포함할 파일 설정
	files: [
		// dist 폴더 전체를 app/dist 경로에 복사
		{
			from: 'dist',
			to: 'dist',
			filter: ['**/*'],
		},
		// Electron 메인 프로세스 코드
		'src/main.cjs',
		// 패키지 정보
		'package.json',
	],

	// package.json의 "main" 필드를 덮어쓸 수도 있음
	extraMetadata: {
		main: './src/main.cjs',
		author: {
			name: 'Kangmin Kim',
			email: 'rkdals0203@gmail.com',
		},
		description: 'Morib Desktop Application',
	},

	// 추가 리소스가 있다면 여기서 지정
	// 여기서는 dist 폴더 이미 files로 포함하므로 꼭 필요하진 않음
	extraResources: [
		{
			from: 'dist',
			to: 'dist',
			filter: ['**/*'],
		},
	],

	// asar 설정 (디버깅 편의를 위해 false 권장)
	// production 배포 시 true로 해도 되지만,
	// 파일 접근 문제를 줄이려면 false 설정이 편리
	asar: {
		smartUnpack: true,
	},
	// asar: false, // 완전히 꺼도 됨

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
				target: 'zip',
				arch: ['arm64', 'x64'],
			},
		],
		category: 'public.app-category.productivity',
		hardenedRuntime: true,
		gatekeeperAssess: false,
		entitlements: 'build/entitlements.mac.plist',
		entitlementsInherit: 'build/entitlements.mac.plist',
		provisioningProfile: 'build/MoribDevelopment.provisionprofile',
		identity: 'Kangmin Kim (AW9VR8N9B5)',
		timestamp: 'http://timestamp.apple.com/ts01',
		strictVerify: false,
	},

	dmg: {
		icon: 'build/icon.icns',
		contents: [
			{
				x: 130,
				y: 220,
			},
			{
				x: 410,
				y: 220,
				type: 'link',
				path: '/Applications',
			},
		],
		window: {
			width: 540,
			height: 380,
		},
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

	afterSign: 'scripts/notarize.cjs',
	forceCodeSigning: true,
};

module.exports = config;
