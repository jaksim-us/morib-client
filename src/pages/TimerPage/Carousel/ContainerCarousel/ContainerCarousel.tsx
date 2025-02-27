import { formatSeconds } from '@/shared/utils/time';

import ClockIcon from '@/shared/assets/svgs/icon_clock.svg?react';

import useCarouselTimer from './hooks/useCarouselTimer';

interface ContainerCarouselProps {
	image: string;
	name: string;
	time: number;
	categoryname: string;
	isPlaying: boolean;
}

const ContainerCarousel = ({ image, name, time, categoryname, isPlaying }: ContainerCarouselProps) => {
	const timer = useCarouselTimer({ isPlaying, previousTime: time });
	const formattedTime = formatSeconds(timer);

	return (
		<>
			{time === 0 ? null : (
				<div className="flex h-[15rem] w-[9.8rem] flex-col items-center justify-center px-[0.8rem] py-[0.5rem]">
					<img src={image} alt="유저 프로필" className="mb-[1rem] h-[7.4rem] w-[7.4rem]" />
					<div className="flex justify-center gap-[0.2rem]">
						<ClockIcon />
						<span className={`text-mint-02 detail-reg-14`}>{formattedTime}</span>
					</div>
					<span className="text-white detail-semibold-14">{name}</span>
					<span className="text-gray-04 detail-reg-12">{categoryname}</span>
				</div>
			)}
		</>
	);
};

export default ContainerCarousel;
