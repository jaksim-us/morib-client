interface Tabs {
	id: number;
	name: string;
}

interface TabSelectProps {
	tabs: Tabs[];
	handleTabChange: (number: number) => void;
	selectedTabId: number;
}

const TabSelect = ({ tabs, handleTabChange, selectedTabId }: TabSelectProps) => {
	const notSelectedStyle = 'text-gray-03 subhead-bold-22 p-[1rem] mr-[0.5rem]';
	const SelectedStyle = 'text-white subhead-bold-22 p-[1rem] mr-[0.5rem]';

	return (
		<>
			{tabs.map((tab) => (
				<button
					key={tab.id}
					className={selectedTabId === tab.id ? SelectedStyle : notSelectedStyle}
					onClick={() => handleTabChange(tab.id)}
				>
					{tab.name}
				</button>
			))}
		</>
	);
};

export default TabSelect;
