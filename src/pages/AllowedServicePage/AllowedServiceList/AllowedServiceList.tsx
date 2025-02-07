import { ButtonHTMLAttributes, ReactNode } from 'react';

import Dropdown from '@/shared/components/Dropdown/Dropdown';
import Spacer from '@/shared/components/Spacer/Spacer';

import MeatBallDefaultIcon from '@/shared/assets/svgs/common/ic_meatball_default.svg?react';
import PlusIcon from '@/shared/assets/svgs/plus.svg?react';

export interface AllowedService {
	id: number;
	allowedServiceName: string;
	selectedColor: string;
	urlList: UrlInfo[];
}

export interface UrlInfo {
	siteName: string;
	page: string;
	url: string;
	faviconUrl: string;
}

interface AllowedServiceListRootProps {
	allowedServices?: AllowedService[];
	activeAllowedServiceId?: number | null;
	setActiveAllowedServiceId?: (id: number) => void;
	addAllowedService?: () => void;
	deleteAllowedService?: (id: number) => void;
	children: ReactNode;
}

const AllowedServiceListRoot = ({
	allowedServices,
	activeAllowedServiceId,
	setActiveAllowedServiceId,
	addAllowedService,
	deleteAllowedService,
	children,
}: AllowedServiceListRootProps) => {
	const maxIconsToShow = 5;

	return (
		<Spacer.Height className="flex w-[31.6rem] flex-shrink-0 flex-col rounded-[1.6rem] bg-gray-bg-03 px-[1.8rem] py-[2.2rem]">
			{children}
		</Spacer.Height>
	);
};

const AllowedServiceListHeader = ({ children }: { children: ReactNode }) => {
	return <div className="flex h-[3.6rem] items-center justify-between">{children}</div>;
};

const AllowedServiceListTitle = ({ children }: { children: ReactNode }) => {
	return <h1 className="text-white head-bold-24">{children}</h1>;
};

const AllowedServiceListPlusButton = ({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button type="button" {...props}>
			<PlusIcon />
		</button>
	);
};

const AllowedServiceListContent = ({ children }: { children: ReactNode }) => {
	return <Spacer.Height className="mt-[2.4rem] flex w-[28rem] flex-col overflow-y-auto">{children}</Spacer.Height>;
};

interface AllowedServiceListItemProps {
	allowedService?: AllowedService;
	activeAllowedServiceId?: number | null;
	onSelectActiveAllowedService?: () => void;
	onDeleteAllowedService?: () => void;
	maxIconsToShow?: number;
}

const AllowedServiceListItem = (
	{
		// allowedService,
		// activeAllowedServiceId,
		// onSelectActiveAllowedService,
		// onDeleteAllowedService,
		// maxIconsToShow = 5,
	}: AllowedServiceListItemProps,
) => {
	// const additionalIconsCount =
	// 	allowedService.urlList.length > maxIconsToShow ? allowedService.urlList.length - maxIconsToShow : 0;
	const test = 1;
	const name = '하이';
	const isActive = true;

	return (
		<div
			className={`relative mb-[0.8rem] flex h-[8rem] w-[28rem] flex-col items-start justify-end rounded-[8px] bg-gray-bg-01 p-[1.4rem] ${isActive ? 'border-[1px] border-mint-01' : ''}`}
		>
			<Spacer.Width className="flex">
				<Spacer.Width className="flex items-center gap-[0.6rem]">
					<div className={`h-[1.4rem] w-[1.4rem] flex-shrink-0 rounded-full bg-blue-400`} />
					<h2 className={`w-[28.8rem] truncate body-semibold-16 ${test === 1 ? 'text-white' : 'text-gray-03'}`}>
						{name || '모립세트 이름을 입력해주세요.'}
					</h2>
				</Spacer.Width>

				<Dropdown>
					<Dropdown.Trigger>
						<MeatBallDefaultIcon className="cursor-pointer hover:rounded-full hover:bg-gray-bg-05" />
					</Dropdown.Trigger>
					<Dropdown.Content boxShadow="shadow-none" className="absolute right-0 top-[2.4rem] w-[12.4rem]">
						<Dropdown.Item label="리스트 삭제" textColor="red" />
					</Dropdown.Content>
				</Dropdown>
			</Spacer.Width>

			<div className="mt-[0.4rem] flex items-center gap-[0.6rem]">
				{/* {allowedService.urlList.slice(0, maxIconsToShow).map(({ faviconUrl }, url) => (
					<img key={url} src={faviconUrl} alt="favicon" className="h-[2rem] w-[2rem] rounded-full" />
				))} */}
				{7 > 0 && (
					<div className="body-detail-reg-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-[57px] bg-date-active text-white">
						+{7}
					</div>
				)}
			</div>
		</div>
	);
};

const AllowedServiceList = Object.assign(AllowedServiceListRoot, {
	Header: AllowedServiceListHeader,
	PlusButton: AllowedServiceListPlusButton,
	Title: AllowedServiceListTitle,
	Content: AllowedServiceListContent,
	Item: AllowedServiceListItem,
});

export default AllowedServiceList;
