import { type ReactNode, createContext, useContext } from 'react';

interface TabsContextProps {
	value: string;
	handleValueChange?: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('Select 컴포넌트는 Select.Root 내에서 사용되어야 합니다.');
	}
	return context;
};

interface TabsRootProps {
	value: string;
	handleValueChange?: (value: string) => void;
	children: ReactNode;
}

const TabsRoot = ({ value, handleValueChange, children }: TabsRootProps) => {
	const contextValue: TabsContextProps = {
		value,
		handleValueChange,
	};

	return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
};

interface TabsContentProps {
	children: ReactNode;
}

const TabsContent = ({ children }: TabsContentProps) => {
	return (
		<div className="flex w-[30rem] flex-col gap-[3rem] rounded-bl-[1.4rem] rounded-tl-[1.4rem] bg-gray-bg-03 px-[1rem] py-[2rem]">
			{children}
		</div>
	);
};

interface TabsTriggerProps {
	children: ReactNode;
	value: string;
}

const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
	const context = useTabsContext();

	return (
		<button
			className={`subhead-med-18 flex h-[4.4rem] w-[28rem] items-center gap-[0.5rem] rounded-[0.2rem] p-[1rem] text-left ${
				context?.value === value ? 'bg-gray-bg-05 text-white' : 'bg-gray-bg-03 text-white'
			}`}
			onClick={() => {
				if (context?.handleValueChange) context?.handleValueChange(value);
			}}
		>
			{children}
		</button>
	);
};

interface TabsCategoryProps {
	children: ReactNode;
	title: string;
}

const TabsCategory = ({ children, title }: TabsCategoryProps) => {
	return (
		<div>
			<p className="p-[1rem] font-semibold text-gray-04">{title}</p>
			{children}
		</div>
	);
};

const Tabs = {
	Root: TabsRoot,
	Content: TabsContent,
	Category: TabsCategory,
	Trigger: TabsTrigger,
};

export default Tabs;
