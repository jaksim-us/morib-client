import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import { LARGE_BTN_TEXT } from '@/shared/constants/btnText';

import HomeDefaultIcon from '@/shared/assets/svgs/home_default_icon.svg?react';

interface StatusDefaultHomeProps {
	onClick?: () => void;
}

const StatusDefaultHome = ({ onClick }: StatusDefaultHomeProps) => {
	return (
		<div className="flex h-[732px] w-[1262px] flex-col items-center">
			<HomeDefaultIcon className="mt-[16.8rem]" />
			<p className="mb-[5.2rem] mt-[2.4rem] text-center text-white title-bold-36">
				당신의 몰입을 도와줄
				<br />
				작업 카테고리를 만들어 보세요!
			</p>
			<HomeLargeBtn variant={HomeLargeBtnVariant.LARGE} onClick={onClick}>
				{LARGE_BTN_TEXT.CREATE_CATEGORY}
			</HomeLargeBtn>
		</div>
	);
};

export default StatusDefaultHome;
