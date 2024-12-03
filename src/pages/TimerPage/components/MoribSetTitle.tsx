import MoribSetBtnActiveIcon from '@/shared/assets/svgs/btn_moribset_active.svg?react';
import MoribSetBtnDefaultIcon from '@/shared/assets/svgs/btn_moribset_default.svg?react';

interface MoribSetTitleProps {
	onClick: () => void;
	registeredNames: string[];
}

const MoribSetTitle = ({ onClick, registeredNames }: MoribSetTitleProps) => {
	const truncateRegisteredNames = () => {
		const maxDisplayLength = 55;
		const joinedNames = registeredNames.join(', ');
		return joinedNames.length > maxDisplayLength ? `${joinedNames.slice(0, maxDisplayLength)}...` : joinedNames;
	};

	return (
		<>
			<div onClick={onClick} className="ml-[3.2rem] mt-[3.2rem] flex h-[5.4rem] w-[81rem] items-center">
				{registeredNames.length > 0 ? <MoribSetBtnActiveIcon /> : <MoribSetBtnDefaultIcon />}
				<p className="subhead-semibold-20 flex overflow-hidden text-ellipsis whitespace-nowrap text-gray-03">
					{registeredNames.length > 0 ? (
						<>
							<span className="text-mint-01">[{truncateRegisteredNames()}] 모립 세트 실행 중</span>
						</>
					) : (
						'모립세트를 등록해주세요.'
					)}
				</p>
			</div>
		</>
	);
};

export default MoribSetTitle;
