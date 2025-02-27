const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

// Electron 창 생성 함수
function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true,
		},
	});

	// 개발 모드 vs 프로덕션 모드 분기
	if (process.env.NODE_ENV === 'development') {
		console.log('🛠 Running in development mode');
		win.loadURL('http://localhost:5173');
	} else {
		console.log('🚀 Running in production mode');
		console.log('🔍 Current directory:', __dirname);

		// app.asar 내부 여부 확인
		const isAsar = process.resourcesPath.includes('app.asar');
		// dist 폴더 경로 결정
		const resourcePath = isAsar
			? path.join(process.resourcesPath, 'app.asar.unpacked', 'dist')
			: path.join(process.resourcesPath, 'dist');

		const indexPath = path.join(resourcePath, 'index.html');
		console.log('📂 Attempting to load file from:', indexPath);

		// 파일 존재 여부 확인 후 로드
		if (fs.existsSync(indexPath)) {
			console.log('✅ index.html file exists');
			// baseURLForDataURL: 꼭 필요한 경우만 사용
			win
				.loadFile(indexPath, {
					baseURLForDataURL: `file://${resourcePath}`,
				})
				.catch((err) => {
					console.error('❌ Failed to load file:', err);
				});
		} else {
			console.error('❌ index.html file not found at:', indexPath);
			// 디렉토리 구조 출력 (디버깅용)
			const parentDir = process.resourcesPath;
			if (fs.existsSync(parentDir)) {
				console.log('📂 Parent directory contents:', fs.readdirSync(parentDir));
				const distDir = path.join(parentDir, 'dist');
				if (fs.existsSync(distDir)) {
					console.log('📂 Dist directory contents:', fs.readdirSync(distDir));
				}
			}
		}
	}

	// DevTools 자동 실행 & 재연결
	win.webContents.openDevTools();
	win.webContents.on('devtools-disconnected', () => {
		console.warn('⚠️ DevTools disconnected. Reopening...');
		setTimeout(() => {
			if (!win.isDestroyed()) {
				win.webContents.openDevTools();
			}
		}, 1000);
	});

	// 페이지 로드 완료 이벤트
	win.webContents.on('did-finish-load', () => {
		console.log('✅ Page loaded successfully');
	});

	// 페이지 로드 실패 이벤트
	win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
		console.error('❌ Page failed to load:', errorCode, errorDescription);
		win.webContents.openDevTools();
	});

	// 렌더러 프로세스 충돌 감지 & 자동 재시작
	win.webContents.on('crashed', () => {
		console.error('❌ Renderer process crashed! Reloading...');
		win.reload();
	});
}

// DevTools 강제 연결 유지 (Chrome Inspect)
app.commandLine.appendSwitch('remote-debugging-port', '9222');

// 준비 완료 시 창 생성
app.whenReady().then(createWindow);

// 모든 창이 닫혔을 때 종료
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// Dock 아이콘 클릭 시 (macOS)
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// 전역 에러 핸들링
process.on('uncaughtException', (error) => {
	console.error('❌ Uncaught Exception:', error);
});
