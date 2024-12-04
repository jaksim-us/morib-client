import type { Router } from '@remix-run/router';

import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

import RedirectPage from '../pages/RedirectPage';
import { ROUTES_CONFIG } from './routesConfig';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const TimerPage = lazy(() => import('@/pages/TimerPage/TimerPage'));
const MoribSetPage = lazy(() => import('@/pages/MoribSetPage/MoribSetPage'));

const ProtectedRoute = () => {
	//Todo: 개발이 진행되면 실제 토큰 상태를 받아서 login page로 이동 시킴
	// const accessToken = getAccessTotken();
	// if (!accessToken) {
	// 	alert('로그인 해주세요');
	// 	return <Navigate to="/login" replace />;
	// }
	return <Outlet />;
};

const router: Router = createBrowserRouter([
	{
		//public 라우트들
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: ROUTES_CONFIG.login.path,
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<LoginPage />
					</Suspense>
				),
			},
			{
				path: ROUTES_CONFIG.redirect.path,
				element: <RedirectPage />,
			},
		],
	},

	{
		//권한이 있어야 접근 가능한 라우트들
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: ROUTES_CONFIG.home.path,
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: ROUTES_CONFIG.timer.path,
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<TimerPage />
					</Suspense>
				),
			},
			{
				path: ROUTES_CONFIG.moribSet.path,
				element: (
					<Suspense fallback={<div>Loading...</div>}>
						<MoribSetPage />
					</Suspense>
				),
			},
		],
	},

	{
		//404 페이지
		path: '*',
		element: <NotFoundPage />,
	},
]);

export default router;
