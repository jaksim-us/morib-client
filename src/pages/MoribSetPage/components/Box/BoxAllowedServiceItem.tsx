import Dropdown from '@/shared/components/Dropdown';

import IconMeatBall from '@/shared/assets/svgs/todo_meatball_default.svg?react';

import { AllowedService } from './../../types';

interface BoxAllowedServiceItemProps {
	allowedService: AllowedService;
	activeAllowedServiceId: number | null;
	setActiveAllowedServiceId: (id: number) => void;
	deleteAllowedService: (id: number) => void;
	maxIconsToShow: number;
}

const BoxAllowedServiceItem = ({
	allowedService,
	activeAllowedServiceId,
	setActiveAllowedServiceId,
	deleteAllowedService,
	maxIconsToShow,
}: BoxAllowedServiceItemProps) => {
	const additionalIconsCount =
		allowedService.urlList.length > maxIconsToShow ? allowedService.urlList.length - maxIconsToShow : 0;

	return (
		<div
			key={allowedService.id}
			className={`mb-[0.8rem] h-[8rem] w-[36.6rem] flex-col items-start justify-end rounded-[8px] bg-gray-bg-01 p-[1.4rem] ${activeAllowedServiceId === allowedService.id ? 'border-[1px] border-mint-01' : ''}`}
			onClick={() => setActiveAllowedServiceId(allowedService.id)}
		>
			<div className="flex content-between items-center self-stretch">
				<div className="flex w-[30.8rem] items-center gap-[0.6rem]">
					<div className={`h-[1.4rem] w-[1.4rem] rounded-[70px] ${allowedService.selectedColor}`} />
					<h2
						className={`w-[28.8rem] truncate body-semibold-16 ${allowedService.allowedServiceName ? 'text-white' : 'text-gray-03'}`}
					>
						{allowedService.allowedServiceName || '모립세트 이름을 입력해주세요.'}
					</h2>
				</div>

				<Dropdown.Root>
					<Dropdown.Trigger>
						<IconMeatBall className="cursor-pointer hover:rounded-full hover:bg-gray-bg-05" />
					</Dropdown.Trigger>
					<Dropdown.Content boxShadow="shadow-none" className="absolute left-[-10rem] w-[12.4rem] overflow-x-hidden">
						<Dropdown.Item
							label="할 일 삭제"
							textColor="red"
							onClick={() => {
								deleteAllowedService(allowedService.id);
							}}
						/>
					</Dropdown.Content>
				</Dropdown.Root>
			</div>

			<div className="mt-[0.4rem] flex items-center gap-[0.6rem]">
				{allowedService.urlList.slice(0, maxIconsToShow).map(({ faviconUrl }, url) => (
					<img key={url} src={faviconUrl} alt="favicon" className="h-[2rem] w-[2rem] rounded-full" />
				))}
				{additionalIconsCount > 0 && (
					<div className="body-detail-reg-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-[57px] bg-date-active text-white">
						+{additionalIconsCount}
					</div>
				)}
			</div>
		</div>
	);
};

export default BoxAllowedServiceItem;
