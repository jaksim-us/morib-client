const { app, BrowserWindow, protocol } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			webSecurity: false, // 로컬 리소스 로드 허용
			allowRunningInsecureContent: true, // 안전하지 않은 컨텐츠 실행 허용
		},
	});

	if (process.env.NODE_ENV === 'development') {
		win.loadURL('http://localhost:5173');
	} else {
		// 경로 확인을 위한 로깅 추가
		const resourcePath = process.resourcesPath;
		const indexPath = path.join(resourcePath, 'dist', 'index.html');

		console.log('Resource Path:', resourcePath);
		console.log('Index Path:', indexPath);

		// 파일 존재 여부 확인
		if (fs.existsSync(indexPath)) {
			console.log('Index file exists');
			win.loadFile(indexPath).catch((err) => {
				console.error('Failed to load file:', err);
			});
		} else {
			console.error('Index file not found');
			// 디렉토리 내용 출력
			const distPath = path.join(resourcePath, 'dist');
			if (fs.existsSync(distPath)) {
				console.log('Files in dist directory:', fs.readdirSync(distPath));
			} else {
				console.log('dist directory not found');
				console.log('Files in resource directory:', fs.readdirSync(resourcePath));
			}
		}
	}

	// 디버깅을 위해 DevTools 열기
	win.webContents.openDevTools();
}

// 앱이 준비되면 파일 프로토콜 등록
app.whenReady().then(() => {
	protocol.registerFileProtocol('file', (request, callback) => {
		const pathname = decodeURI(request.url.replace('file:///', ''));
		callback(pathname);
	});
	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// 오류 처리
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
});
