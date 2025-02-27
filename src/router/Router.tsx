import type { Router } from '@remix-run/router';

import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';

import LoadingOverlay from '@/shared/components/LoadingOverlay/LoadingOverlay';

import AllowedServicePage from '@/pages/AllowedServicePage/AllowedServicePage';
import HomePage from '@/pages/HomePage/HomePage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import Layout from '@/shared/layout/Layout';

import ProtectedRoute from './ProtectedRoute';
import { ROUTES_CONFIG } from './routesConfig';

const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'));
const RedirectPage = lazy(() => import('@/pages/RedirectPage/RedirectPage'));
const OnboardingPage = lazy(() => import('@/pages/OnboardingPage/OnboardingPage'));
const TimerPage = lazy(() => import('@/pages/TimerPage/TimerPage'));

const router: Router = createBrowserRouter([
	{
		//public 라우트들
		path: '/',
		element: <Outlet />,
		children: [
			{
				path: ROUTES_CONFIG.login.path,
				element: (
					<Suspense fallback={<LoadingOverlay isLoading dim={false} />}>
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
					<Layout>
						<HomePage />
					</Layout>
				),
			},
			{
				path: ROUTES_CONFIG.onboarding.path,
				element: (
					<Layout>
						<OnboardingPage />
					</Layout>
				),
			},
			{
				path: ROUTES_CONFIG.timer.path,
				element: (
					<Suspense fallback={<LoadingOverlay isLoading dim={false} />}>
						<TimerPage />
					</Suspense>
				),
			},
			{
				path: ROUTES_CONFIG.allowedService.path,
				element: (
					<Layout>
						<AllowedServicePage />
					</Layout>
				),
			},
		],
	},

	{
		//404 페이지
		path: '*',
		element: (
			<Layout>
				<NotFoundPage />
			</Layout>
		),
	},
]);

export default router;
