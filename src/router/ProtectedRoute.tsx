import { Navigate, Outlet } from 'react-router-dom';

import { getAccessToken } from '@/shared/utils/token';

import { ROUTES_CONFIG } from './routesConfig';

const ProtectedRoute = () => {
	const accessToken = getAccessToken();
	if (!accessToken) {
		alert('로그인 해주세요.');
		return <Navigate to={ROUTES_CONFIG.login.path} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
