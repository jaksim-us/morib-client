import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';

// NOTE: 서버 개발 완료로 잠시 주석처리
async function enableMocking() {
	// if (import.meta.env.DEV) {
	// 	const { worker } = await import('./mocks/browser');
	// 	return worker.start();
	// }
}

enableMocking().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
