import { ButtonHTMLAttributes, ReactNode } from 'react';

import HomeLargeBtn from '@/shared/components/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import ColorIcon from '@/shared/assets/svgs/ic_color.svg?react';
import MinusIcon from '@/shared/assets/svgs/ic_minus.svg?react';
import PencilIcon from '@/shared/assets/svgs/ic_pencil.svg?react';

import { getServiceFavicon } from '../../utils/serviceUrl';

interface AllowedServicesRootProps {
	children: ReactNode;
}

const AllowedServicesRoot = ({ children }: AllowedServicesRootProps) => {
	return (
		<div className="flex h-screen w-[48.7rem] flex-shrink-0 pb-[4.8rem] pr-[4.2rem] pt-[11.8rem]">
			<div className="grid w-full grid-rows-[auto,1fr,auto] rounded-[18px] bg-gray-bg-03 p-[2.8rem]">{children}</div>
		</div>
	);
};

const AllowedServiceHeader = () => {
	return (
		<div className="flex items-center">
			<button>
				<ColorIcon />
			</button>
			<h2 className="ml-[1rem] text-white head-bold-30">나의 허용서비스</h2>
			<button className="ml-[1.7rem]">
				<PencilIcon />
			</button>
		</div>
	);
};

interface AllowedServiceListProps {
	children: ReactNode;
}

const AllowedServiceList = ({ children }: AllowedServiceListProps) => {
	return <ul className="mt-[2rem] overflow-auto">{children}</ul>;
};

interface AllowedServiceItemProps {
	siteUrl: string;
	siteName: string;
	onClick: (url: string) => void;
}

const AllowedServiceItem = ({ siteUrl, siteName, onClick }: AllowedServiceItemProps) => {
	return (
		<li className="flex h-[5.4rem] w-full items-center border-b border-b-gray-bg-04 px-[1rem] py-[1.2rem]">
			<img src={getServiceFavicon(siteUrl)} alt={`${siteName} 아이콘`} className="h-[2rem] w-[2rem]" />
			<h3 className="ml-[1.2rem] w-[6.6rem] flex-shrink-0 truncate p-0 text-white body-med-16">{siteName}</h3>
			<div className="ml-[2.2rem] h-[3.1rem] w-[20.4rem] flex-shrink-0 truncate rounded-[20px] bg-gray-bg-04 px-[1rem] py-[0.6rem] text-gray-04 body-reg-16">
				{siteUrl}
			</div>
			<button
				onClick={() => {
					onClick(siteUrl);
				}}
				className="flex-shrink-0"
			>
				<MinusIcon className="ml-[1.25rem]" />
			</button>
		</li>
	);
};

const AllowedServiceBottomButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<HomeLargeBtn variant={HomeLargeBtnVariant.MIDDLE} className="mt-[2rem]" {...props}>
			{props.children}
		</HomeLargeBtn>
	);
};

const AllowedService = Object.assign(AllowedServicesRoot, {
	Header: AllowedServiceHeader,
	List: AllowedServiceList,
	Item: AllowedServiceItem,
	BottomButton: AllowedServiceBottomButton,
});

export default AllowedService;
