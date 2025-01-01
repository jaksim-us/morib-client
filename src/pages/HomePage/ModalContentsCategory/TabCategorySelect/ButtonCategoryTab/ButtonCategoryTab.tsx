import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonCategoryTabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	activeTab: number;
	tabId: number;
}

const ButtonCategoryTab = ({ children, activeTab, tabId, onClick }: ButtonCategoryTabProps) => {
	const notSelectedStyle = 'text-gray-03 subhead-bold-22 p-[1rem]';
	const SelectedStyle = 'text-white subhead-bold-22 p-[1rem] border-b-[2px] border-text-white';
	const tabBtnStyle = activeTab === tabId ? SelectedStyle : notSelectedStyle;

	return (
		<button className={tabBtnStyle} onClick={onClick}>
			{children}
		</button>
	);
};

export default ButtonCategoryTab;
