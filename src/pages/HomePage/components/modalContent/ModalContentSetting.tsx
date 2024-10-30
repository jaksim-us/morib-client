import { useState } from 'react';

import SettingIcon from '@/shared/assets/svgs/setting.svg?react';
import UserIcon from '@/shared/assets/svgs/user_circle.svg?react';

import AccountContent from './AccountContent';
import WorkSpaceSettingContent from './WorkspaceSettingContent';

const ModalContentSetting = () => {
	const [activeTab, setActiveTab] = useState<'account' | 'settings'>('account');
	const user = {
		name: '홍길동',
		email: 'honggildong@example.com',
	};

	const personalWorkspaces = ['개인 프로젝트'];
	const teamWorkspaces = ['팀 A 프로젝트', '팀 B 프로젝트'];

	return (
		<div className="flex h-[80rem] w-[130rem] rounded-[1.4rem] bg-gray-bg-04">
			<div className="flex w-[30rem] flex-col gap-[3rem] rounded-bl-[1.4rem] rounded-tl-[1.4rem] bg-gray-bg-03 px-[1rem] py-[2rem]">
				<div>
					<p className="p-[1rem] font-semibold text-gray-04">사용자 설정</p>
					<button
						onClick={() => setActiveTab('account')}
						className={`subhead-med-18 flex h-[4.4rem] w-[28rem] items-center gap-[0.5rem] rounded-[0.2rem] p-[1rem] text-left ${
							activeTab === 'account' ? 'bg-gray-bg-05 text-white' : 'bg-gray-bg-03 text-white'
						}`}
					>
						<UserIcon />내 계정
					</button>
				</div>
				<div>
					<p className="p-[1rem] font-semibold text-gray-04">워크스페이스</p>
					<button
						onClick={() => setActiveTab('settings')}
						className={`subhead-med-18 flex h-[4.4rem] w-[28rem] items-center gap-[0.5rem] rounded-[0.2rem] p-[1rem] text-left ${
							activeTab === 'settings' ? 'bg-gray-bg-05 text-white' : 'bg-gray-bg-03 text-white'
						}`}
					>
						<SettingIcon />
						설정
					</button>
				</div>
			</div>

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
