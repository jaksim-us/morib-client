import { ReactElement, ReactNode, createContext, useContext } from 'react';

interface TabsContextProps {
	activeTab: string;
	onChangeActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Tabs의 컴포넌트는 TabsRoot 내부에서 사용되어야 합니다.');
	}
	return context;
};

interface TabsRootProps {
	activeTab: string;
	onChangeActiveTab: (tab: string) => void;
	children: ReactNode;
}

const TabsRoot = ({ activeTab, onChangeActiveTab, children }: TabsRootProps) => {
	const context = {
		activeTab,
		onChangeActiveTab,
	};

	return (
		<TabsContext.Provider value={context}>
			<div className="w-[85%]">{children}</div>
		</TabsContext.Provider>
	);
};

interface TabsTriggerListProps {
	children: ReactNode;
}

const TabsTriggerList = ({ children }: TabsTriggerListProps) => {
	return <div className="mr-[17%] grid min-w-[840px] grid-cols-7">{children}</div>;
};

interface TabsTriggerProps {
	value: string;
}

const TabsTrigger = ({ value }: TabsTriggerProps) => {
	const { activeTab, onChangeActiveTab } = useTabsContext();
	const isActive = activeTab === value;

	return (
		<button
			className={`flex h-[7rem] items-center justify-center text-white subhead-reg-22 ${isActive ? 'border-b-[2px] border-b-mint-01' : 'border-b-[3px] border-b-gray-02'}`}
			onClick={() => onChangeActiveTab(value)}
		>
			{value}
		</button>
	);
};

interface TabsContentListProps {
	children: ReactNode;
}

const TabsContentList = ({ children }: TabsContentListProps) => {
	return <div className="mt-[4rem]">{children}</div>;
};

interface TabsContentProps {
	value: string;
	children: ReactElement;
}

const TabsContent = ({ value, children }: TabsContentProps) => {
	const { activeTab } = useTabsContext();
	const targetContent = value === activeTab && children;

	return <>{targetContent}</>;
};

const Tabs = {
	Root: TabsRoot,
	TriggerList: TabsTriggerList,
	Trigger: TabsTrigger,
	ContentList: TabsContentList,
	Content: TabsContent,
};

export default Tabs;
