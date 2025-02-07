import { useRef, useState } from 'react';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import Spacer from '@/shared/components/Spacer/Spacer';

import { Direction } from '@/shared/types/global';

import { recommendServices } from '@/shared/constants/recommendSites';

import { UrlInfo } from '../types';

interface BoxRecommendServiceProps {
	addUrlToAllowedService: (url: UrlInfo) => void;
}

const BoxRecommendService = ({ addUrlToAllowedService }: BoxRecommendServiceProps) => {
	const [availableServices, setAvailableServices] = useState(recommendServices);

	const handleServiceClick = (service: { serviceName: string; url: string }) => {
		addUrlToAllowedService({
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
		<Spacer.Width className="relative h-[18.8rem] flex-shrink-0 rounded-[16px] bg-gray-bg-03">
			<Spacer.Width className="flex items-end justify-between pt-[2.2rem]">
				<h2 className="text-white head-bold-24">추천 서비스</h2>
				<div className="flex items-center">
					<ButtonArrowSVG
						className="flex h-[3.4rem] w-[3.4rem] items-center justify-center p-[0.5rem]"
						direction={Direction.LEFT}
						onClick={() => scrollCarousel('left')}
					/>
					<ButtonArrowSVG
						className="z-10 flex h-[3.4rem] w-[3.4rem] items-center justify-center p-[0.5rem]"
						direction={Direction.RIGHT}
						onClick={() => scrollCarousel('right')}
					/>
				</div>
			</Spacer.Width>

			<Spacer.Width>
				<div
					ref={carouselContainerRef}
					className="my-[2.4rem] flex w-full min-w-0 items-center gap-[1.4rem] overflow-x-auto"
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
							<p className="max-h-[8.4rem] overflow-hidden text-white subhead-bold-20">{service.serviceName}</p>
						</div>
					))}
					<div className="absolute right-0 top-0 z-0 h-[18.8rem] w-[7.2rem] flex-shrink-0 rounded-r-[16px] bg-gradient-to-r from-transparent to-[#33373F]" />
				</div>
			</Spacer.Width>
		</Spacer.Width>
	);
};

export default BoxRecommendService;
