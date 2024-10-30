import React, { useState } from 'react';

import ButtonSettingSaved from '@/shared/components/ButtonSettingSaved';
import ButtonStatusToggle from '@/shared/components/ButtonStatusToggle';

import ArrowRightIcon from '@/shared/assets/svgs/arrow_right.svg?react';
import MailIcon from '@/shared/assets/svgs/mail.svg?react';

interface User {
	name: string;
	email: string;
}

interface AccountContentProps {
	user: User;
}

const AccountContent = ({ user }: AccountContentProps) => {
	const [isToggleOn, setIsToggleOn] = useState(false);
	const [userName, setUserName] = useState(user.name);

	const handleToggle = () => setIsToggleOn((prev) => !prev);

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	return (
		<>
			<p className="subhead-bold-22 w-[92rem] border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white">내 프로필</p>
			<div className="flex w-[92rem] gap-[2rem] py-[2rem]">
				<div className="h-[7.5rem] w-[7.5rem] rounded-full bg-gray-bg-07" />
				<div className="flex flex-col items-center gap-[0.5rem]">
					<input
						type="text"
						value={userName}
						onChange={handleNameChange}
						className="subhead-med-18 flex h-[4.6rem] w-[25rem] items-center rounded-[0.5rem] bg-gray-bg-03 p-[1rem] text-white focus:outline-none"
					/>
					<div className="flex w-[25rem] items-center gap-[0.5rem]">
						<MailIcon />
						<div className="body-reg-16 text-gray-04">{user.email}</div>
					</div>
				</div>
			</div>
			<p className="subhead-bold-22 h-[6.1rem] w-[92rem] border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white">
				내 알림
			</p>
			<div className="flex h-[9.2rem] w-[92rem] items-center justify-between py-[2rem]">
				<div className="flex flex-col gap-[0.5rem]">
					<p className="subhead-semibold-18 text-white">데스크톱 푸시 알림</p>
					<p className="body-reg-16 text-gray-04">데스크톱 앱에서 작성의 푸시 알림을 즉시 받으세요.</p>
				</div>
				<ButtonStatusToggle isToggleOn={isToggleOn} onToggle={handleToggle} />
			</div>
			<p className="subhead-bold-22 mt-[3rem] h-[6.1rem] w-[92rem] border-b-[0.1rem] border-gray-bg-05 py-[1.5rem] text-white">
				지원
			</p>

			<div className="flex w-[92rem] items-center">
				<div className="flex h-[9.2rem] w-[92rem] flex-col gap-[0.5rem] py-[2rem]">
					<p className="subhead-semibold-18 text-white">모든 기기에서 로그아웃</p>
					<p className="body-reg-16 text-gray-04">본 기기를 포함한 모든 기기에서 로그아웃합니다.</p>
				</div>
				<ArrowRightIcon className="rounded-[1.6rem] hover:bg-gray-bg-05" />
			</div>

			<div className="flex w-[92rem] items-center">
				<div className="flex h-[9.2rem] w-[92rem] flex-col gap-[0.5rem] py-[2rem]">
					<p className="subhead-semibold-18 text-error-01">내 계정 삭제</p>
					<p className="body-reg-16 text-gray-04">본 기기를 포함한 모든 기기에서 로그아웃합니다.</p>
				</div>
				<ArrowRightIcon className="rounded-[1.6rem] hover:bg-gray-bg-05" />
			</div>

			<div className="flex h-[9.2rem] w-[92rem] justify-end pt-[4rem]">
				<ButtonSettingSaved />
			</div>
		</>
	);
};

export default AccountContent;
