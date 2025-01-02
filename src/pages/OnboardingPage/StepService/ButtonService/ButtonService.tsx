import DesignIcon from '@/shared/assets/svgs/ic_service_design.svg?react';

interface ButtonServiceProps {
	onAddSelectedService: (service: string) => void;
}

const ButtonService = ({ onAddSelectedService }: ButtonServiceProps) => {
	return (
		<button
			onClick={() => onAddSelectedService('https://www.behance.net/')}
			className="flex h-[11rem] w-[34rem] items-center gap-x-[2rem] rounded-[8px] bg-gray-bg-03 p-[2rem]"
		>
			<DesignIcon />
			<div className="flex flex-col">
				<p className="w-[21.3rem] truncate text-start text-white head-bold-24">디자인</p>
				<p className="w-[21.3rem] truncate text-start text-gray-03 detail-reg-14">https://www.behance.net/</p>
			</div>
		</button>
	);
};

export default ButtonService;
