import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	// file:// 프로토콜에서 상대 경로로 리소스 불러오기 위해 base 설정
	base: './',
	plugins: [react(), svgr()],
	resolve: {
		alias: [{ find: '@', replacement: '/src' }],
	},
	build: {
		outDir: 'dist', // 빌드 결과물 폴더
	},
});
