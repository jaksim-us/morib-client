import { useState } from 'react';

import SettingIcon from '@/shared/assets/svgs/setting.svg?react';
import UserIcon from '@/shared/assets/svgs/user_circle.svg?react';

import AccountContent from './components/AccountContent';
import Tabs from './components/Tabs';
import WorkSpaceSettingContent from './components/WorkspaceSettingContent';

const ModalContentSetting = () => {
	const [activeTab, setActiveTab] = useState<string>('account');
	const user = {
		name: '홍길동',
		email: 'honggildong@example.com',
	};

	const personalWorkspaces = ['개인 프로젝트'];
	const teamWorkspaces = ['팀 A 프로젝트', '팀 B 프로젝트'];

	const handleTabChange = (value: string) => {
		setActiveTab(value);
	};

	return (
		<div className="flex h-[80rem] w-[130rem] rounded-[1.4rem] bg-gray-bg-04">
			<Tabs.Root value={activeTab} handleValueChange={handleTabChange}>
				<Tabs.Content>
					<Tabs.Category title="사용자 설정">
						<Tabs.Trigger value="account">
							<UserIcon />내 계정
						</Tabs.Trigger>
					</Tabs.Category>

					<Tabs.Category title="워크스페이스">
						<Tabs.Trigger value="settings">
							<SettingIcon />
							설정
						</Tabs.Trigger>
					</Tabs.Category>
				</Tabs.Content>
			</Tabs.Root>

			<div className="flex flex-col p-[4rem]">
				{activeTab === 'account' ? (
					<AccountContent user={user} />
				) : (
					<WorkSpaceSettingContent personalWorkspaces={personalWorkspaces} teamWorkspaces={teamWorkspaces} />
				)}
			</div>
		</div>
	);
};

export default ModalContentSetting;
