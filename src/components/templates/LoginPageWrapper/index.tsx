import { ReactNode } from 'react';

interface LoginPageWrapperProps {
	children: ReactNode;
}

const LoginPageWrapper = ({ children }: LoginPageWrapperProps) => {
	return <div className="flex h-screen items-center justify-center bg-login-bg bg-cover">{children}</div>;
};

export default LoginPageWrapper;
