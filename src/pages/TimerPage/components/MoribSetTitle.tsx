import MoribSetBtnDefaultIcon from '@/shared/assets/svgs/btn_moribset_default.svg?react';

const MoribSetTitle = ({ onClick }: { onClick: () => void }) => {
	return (
		<>
			<div
				onClick={onClick}
				className="ml-[3.2rem] mt-[3.2rem] flex h-[5.4rem] w-[25.5rem] items-center justify-center"
			>
				<MoribSetBtnDefaultIcon />
				<p className="subhead-semibold-20 text-gray-03">모립세트를 등록해주세요.</p>
			</div>
		</>
	);
};

export default MoribSetTitle;
