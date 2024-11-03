import { useState } from 'react';

import TabSelect from '@/shared/components/ModalContents/TabSelect';

import { FRIENDSLIST_TABS } from '@/shared/constants/tabSelections';

const FriendList = () => {
	const [selectedTabId, setSelectedTabId] = useState(FRIENDSLIST_TABS[0].id);
	const handleTabChange = (tab: number) => {
		setSelectedTabId(tab);
	};
	return (
		<div className="h-[800px] w-[1300px] rounded-[14px] bg-gray-bg-03 p-[4rem] shadow-[0_3px_30px_0px_rgba(0,0,0,0.4)]">
			<h1 className="title-bold-32 mb-[1rem] text-white">친구</h1>
			<TabSelect tabs={FRIENDSLIST_TABS} handleTabChange={handleTabChange} selectedTabId={selectedTabId} />
		</div>
	);
};

export default FriendList;
