import { useNavigate } from 'react-router-dom';

import HomeLargeBtn from '@/shared/components/Button/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import { ColorIcon, DesignSmIcon, MinusIcon, PencilIcon } from '@/shared/assets/home/svgs';

interface BoxAllowedServiceProps {
	selectedService: string[];
	onRemoveSelectedService: (service: string) => void;
}

const BoxAllowedService = ({ selectedService, onRemoveSelectedService }: BoxAllowedServiceProps) => {
	const navigate = useNavigate();

	return (
		<div className="flex h-screen w-[48.7rem] flex-shrink-0 pb-[4.8rem] pr-[4.2rem] pt-[11.8rem]">
			<div className="grid w-full grid-rows-[auto,1fr,auto] rounded-[18px] bg-gray-bg-03 p-[2.8rem]">
				<div className="flex items-center">
					<button>
						<ColorIcon />
					</button>
					<h2 className="ml-[1rem] text-white head-bold-30">나의 모립세트</h2>
					<button className="ml-[1.7rem]">
						<PencilIcon />
					</button>
				</div>

				<ul className="mt-[2rem] overflow-auto">
					{selectedService.map((service) => (
						<li
							key={service}
							className="flex h-[5.4rem] w-full items-center border-b border-b-gray-bg-04 px-[1rem] py-[1.2rem]"
						>
							<DesignSmIcon />
							<h3 className="ml-[1.2rem] p-0 text-white body-med-16">{'Pinterest'}</h3>
							<div className="ml-[4.2rem] h-[3.1rem] w-[23.1rem] truncate rounded-[20px] bg-gray-bg-04 px-[1rem] py-[0.6rem] text-gray-04 body-reg-16">
								{service}
							</div>
							<button
								onClick={() => {
									onRemoveSelectedService(service);
								}}
							>
								<MinusIcon className="ml-[1.25rem]" />
							</button>
						</li>
					))}
				</ul>

				<HomeLargeBtn
					onClick={() => navigate('/home')}
					disabled={selectedService.length === 0}
					variant={HomeLargeBtnVariant.MIDDLE}
					className="mt-[2rem]"
				>
					모두 입력했어요
				</HomeLargeBtn>
			</div>
		</div>
	);
};

export default BoxAllowedService;
