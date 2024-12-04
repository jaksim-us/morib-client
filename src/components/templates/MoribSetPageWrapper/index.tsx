import { ReactNode } from 'react';

interface MoribSetPageWrapperProps {
	children: ReactNode;
}

const MoribSetPageWrapper = ({ children }: MoribSetPageWrapperProps) => {
	return <div className="relative flex h-screen w-screen bg-gray-bg-01">{children}</div>;
};

export default MoribSetPageWrapper;
