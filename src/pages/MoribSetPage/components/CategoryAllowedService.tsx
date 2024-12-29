import IconPlus from '@/shared/assets/svgs/plus.svg?react';

import { AllowedService } from './../types';
import BoxAllowedServiceItem from './Box/BoxAllowedServiceItem';

interface CategoryAllowedServiceProps {
	allowedServices: AllowedService[];
	activeAllowedServiceId: number | null;
	setActiveAllowedServiceId: (id: number) => void;
	addAllowedService: () => void;
	deleteAllowedService: (id: number) => void;
}

const CategoryAllowedService = ({
	allowedServices,
	activeAllowedServiceId,
	setActiveAllowedServiceId,
	addAllowedService,
	deleteAllowedService,
}: CategoryAllowedServiceProps) => {
	const maxIconsToShow = 5;

	return (
		<div className="relative z-0 ml-[2.4rem] h-[99.6rem] w-[40.2rem] flex-shrink-0 overflow-x-hidden overflow-y-scroll rounded-[1.6rem] bg-gray-bg-03">
			<div className="mb-[2.4rem] mt-[2.2rem] flex items-center justify-between px-[2.8rem]">
				<h1 className="text-white head-bold-24">내 모립세트</h1>
				<IconPlus className="cursor-pointer" onClick={addAllowedService} />
			</div>

			<div className="mx-[1.8rem] gap-[1rem]">
				{allowedServices.map((allowedService) => (
					<BoxAllowedServiceItem
						key={allowedService.id}
						allowedService={allowedService}
						activeAllowedServiceId={activeAllowedServiceId}
						setActiveAllowedServiceId={setActiveAllowedServiceId}
						deleteAllowedService={deleteAllowedService}
						maxIconsToShow={maxIconsToShow}
					/>
				))}
			</div>
		</div>
	);
};

export default CategoryAllowedService;
