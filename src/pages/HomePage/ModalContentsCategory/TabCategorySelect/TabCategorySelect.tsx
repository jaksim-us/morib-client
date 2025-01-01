import ButtonCategoryTab from './ButtonCategoryTab/ButtonCategoryTab';

interface Tabs {
	id: number;
	name: string;
}

interface TabCategorySelectProps {
	tabs: Tabs[];
	handleTabChange: (number: number) => void;
	selectedTabId: number;
}

const TabCategorySelect = ({ tabs, handleTabChange, selectedTabId }: TabCategorySelectProps) => {
	return (
		<>
			{tabs.map((tab) => (
				<ButtonCategoryTab
					tabId={tab.id}
					key={tab.id}
					onClick={() => {
						handleTabChange(tab.id);
					}}
					activeTab={selectedTabId}
				>
					{tab.name}
				</ButtonCategoryTab>
			))}
		</>
	);
};

export default TabCategorySelect;
