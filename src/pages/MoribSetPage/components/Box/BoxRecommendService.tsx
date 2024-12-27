import { useRef, useState } from 'react';

import { Direction } from '@/shared/types/global';

import { recommendServices } from '@/shared/constants/recommendSites';

import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';

import { UrlInfo } from './../../types';

interface BoxRecommendServiceProps {
	addUrlToMoribSet: (url: UrlInfo) => void;
}

const BoxRecommendService = ({ addUrlToMoribSet }: BoxRecommendServiceProps) => {
	const [availableServices, setAvailableServices] = useState(recommendServices);

	const handleServiceClick = (service: { serviceName: string; url: string }) => {
		addUrlToMoribSet({
			siteName: service.serviceName.replace(/^www\./, '').replace(/\.[a-z]{2,}$/, ''),
			page: service.serviceName,
			url: service.url,
			faviconUrl: `https://www.google.com/s2/favicons?domain=${service.url}`,
		});
		setAvailableServices((prevServices) => prevServices.filter((item) => item.url !== service.url));
	};

	const carouselContainerRef = useRef<HTMLDivElement | null>(null);

	const scrollCarousel = (direction: 'left' | 'right') => {
		if (carouselContainerRef.current) {
			const scrollAmount = 1264;
			if (direction === 'left') {
				carouselContainerRef.current.scrollLeft -= scrollAmount;
			} else {
				carouselContainerRef.current.scrollLeft += scrollAmount;
			}
		}
	};

	return (
		<div className="relative h-[18.8rem] w-[132rem] flex-shrink-0 rounded-[16px] bg-gray-bg-03">
			<div className="mx-[2.8rem] flex w-[126.4rem] items-end justify-between self-stretch pt-[2.2rem]">
				<h2 className="head-bold-24 text-white">추천 서비스</h2>
				<div className="flex items-center">
					<ArrowSVGBtn
						className="flex h-[3.4rem] w-[3.4rem] items-center justify-center p-[0.5rem]"
						direction={Direction.LEFT}
						onClick={() => scrollCarousel('left')}
					/>
					<ArrowSVGBtn
						className="z-10 flex h-[3.4rem] w-[3.4rem] items-center justify-center p-[0.5rem]"
						direction={Direction.RIGHT}
						onClick={() => scrollCarousel('right')}
					/>
				</div>
			</div>

			<div
				ref={carouselContainerRef}
				className="mx-[2.8rem] my-[2.4rem] flex items-center gap-[1.4rem] overflow-x-hidden"
			>
				{availableServices.map((service, index) => (
					<div
						key={index}
						className="flex w-[23.9rem] flex-shrink-0 items-center gap-[1.5rem] rounded-[8px] bg-gray-bg-01 p-[2rem]"
						onClick={() => handleServiceClick(service)}
					>
						<img
							src={`https://www.google.com/s2/favicons?domain=${service.url}`}
							alt="favicon"
							className="h-[4.2rem] w-[4.2rem] rounded-full"
						/>
						<p className="subhead-bold-20 max-h-[8.4rem] overflow-hidden text-white">{service.serviceName}</p>
					</div>
				))}
				<div className="absolute right-0 top-0 z-0 h-[18.8rem] w-[7.2rem] flex-shrink-0 rounded-r-[16px] bg-gradient-to-r from-transparent to-[#33373F]" />
			</div>
		</div>
	);
};

export default BoxRecommendService;
