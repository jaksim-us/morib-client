require('dotenv').config();
const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
	const { electronPlatformName, appOutDir } = context;
	if (electronPlatformName !== 'darwin') {
		return;
	}

	const appName = context.packager.appInfo.productFilename;
	console.log(`Notarizing ${appName} found at ${appOutDir}`);

	// 최대 3번 재시도
	for (let attempt = 1; attempt <= 3; attempt++) {
		try {
			await notarize({
				tool: 'notarytool',
				appPath: `${appOutDir}/${appName}.app`,
				appleId: process.env.APPLE_ID,
				appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
				teamId: process.env.APPLE_TEAM_ID,
				timeout: 1000 * 60 * 10, // 10분으로 타임아웃 설정
			});
			console.log('Notarization successful!');
			return;
		} catch (error) {
			console.log(`Attempt ${attempt} failed:`, error);
			if (attempt === 3) {
				throw error;
			}
			// 재시도 전 1분 대기
			console.log('Waiting 1 minute before retrying...');
			await new Promise((resolve) => setTimeout(resolve, 60000));
		}
	}
};
