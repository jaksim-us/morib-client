import { DesignIcon } from '../../../assets/svgs';

const ButtonService = () => {
	return (
		<button className="flex h-[11rem] w-[34rem] items-center gap-x-[2rem] rounded-[8px] bg-gray-bg-03 p-[2rem]">
			<DesignIcon />
			<div className="flex flex-col">
				<p className="head-bold-24 w-[21.3rem] overflow-hidden text-ellipsis whitespace-nowrap text-start text-white">
					디자인
				</p>
				<p className="detail-reg-14 w-[21.3rem] overflow-hidden text-ellipsis whitespace-nowrap text-start text-gray-03">
					https://www.behance.net/
				</p>
			</div>
		</button>
	);
};

export default ButtonService;
