import { ReactNode } from 'react';

interface HomePageWrapper {
	children: ReactNode;
}

const HomePageWrapper = ({ children }: HomePageWrapper) => {
	return <div className="flex min-h-screen w-screen bg-gray-bg-01">{children}</div>;
};

export default HomePageWrapper;
