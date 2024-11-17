import { ReactNode } from 'react';

interface LoginPageWrapperProps {
	children: ReactNode;
}

const LoginPageWrapper = ({ children }: LoginPageWrapperProps) => {
	return <div className="bg-login-bg flex h-screen items-center justify-center bg-cover">{children}</div>;
};

export default LoginPageWrapper;
