import { ButtonHTMLAttributes, ReactNode } from 'react';

interface TabBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	activeTab: number;
	tabId: number;
}

const CategoryTabBtn = ({ children, activeTab, tabId, onClick }: TabBtnProps) => {
	const notSelectedStyle = 'text-gray-03 subhead-bold-22 px-[4px] py-[10px] mr-[1.7rem]';
	const SelectedStyle = 'text-white subhead-bold-22 px-[4px] py-[10px] mr-[1.7rem] border-b-[2px] border-text-white';
	const tabBtnStyle = activeTab === tabId ? SelectedStyle : notSelectedStyle;

	return (
		<button className={tabBtnStyle} onClick={onClick}>
			{children}
		</button>
	);
};

export default CategoryTabBtn;
