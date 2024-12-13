import MoribSetBtnActiveIcon from '@/shared/assets/svgs/btn_moribset_active.svg?react';
import MoribSetBtnDefaultIcon from '@/shared/assets/svgs/btn_moribset_default.svg?react';

import ToolTipAllowedService from './ToolTipAllowedService';

interface TitleAllowedServiceProps {
	onClick: () => void;
	registeredNames: string[];
}

const TitleAllowedService = ({ onClick, registeredNames }: TitleAllowedServiceProps) => {
	const joinedNames = registeredNames.join(', ');

	return (
		<div onClick={onClick} className="ml-[3.2rem] mt-[3.2rem] flex h-[5.4rem] w-[81rem] items-center">
			{registeredNames.length > 0 ? (
				<>
					<MoribSetBtnActiveIcon className="h-[5.5rem] w-[5.4rem] flex-shrink-0" />
					<p className="subhead-semibold-20 flex items-center overflow-hidden whitespace-nowrap text-gray-03">
						<span className="text-mint-01">[</span>
						<span className="overflow-hidden text-ellipsis whitespace-nowrap text-mint-01">{joinedNames}</span>
						<span className="text-mint-01">] 모립 세트 실행 중</span>
					</p>
				</>
			) : (
				<div className="ml-[3.2rem] mt-[3.2rem] flex-col items-center">
					<div className="flex items-center">
						<MoribSetBtnDefaultIcon />
						<p className="subhead-semibold-20 text-gray-03">허용서비스 세트를 등록해주세요.</p>
					</div>
					<div className="ml-[1rem]">
						<ToolTipAllowedService />
					</div>
				</div>
			)}
		</div>
	);
};

export default TitleAllowedService;
