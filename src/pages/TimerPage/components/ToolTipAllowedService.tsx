import TriangleIcon from '@/shared/assets/svgs/triangle.svg?react';

const ToolTipAllowedService = () => {
	return (
		<div className="relative">
			<TriangleIcon className="absolute left-[1rem] top-[-1rem]" />
			<div className="body-reg-16 flex h-[3.6rem] w-auto items-center justify-center rounded-[5px] bg-gray-bg-02 px-[2.8rem] py-[0.7rem] text-gray-05">
				허용 서비스 세트를 먼저 설정해주세요.
			</div>
		</div>
	);
};

export default ToolTipAllowedService;
