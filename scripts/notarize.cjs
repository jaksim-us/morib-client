require('dotenv').config();
const { notarize } = require('@electron/notarize');

exports.default = async function notarizing(context) {
	const { electronPlatformName, appOutDir } = context;
	if (electronPlatformName !== 'darwin') {
		return;
	}

	const appName = context.packager.appInfo.productFilename;
	const appBundleId = context.packager.appInfo.id;

	console.log(`Notarizing ${appBundleId} found at ${appOutDir}`);

	try {
		await notarize({
			tool: 'notarytool',
			appPath: `${appOutDir}/${appName}.app`,
			appleId: process.env.APPLE_ID,
			appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
			teamId: process.env.APPLE_TEAM_ID,
		});
	} catch (error) {
		console.error('Notarization failed:', error);
		throw error;
	}

	console.log(`Done notarizing ${appBundleId}`);
};
