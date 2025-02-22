import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';

import { Direction } from '@/shared/types/global';

import ContainerCarousel from './ContainerCarousel/ContainerCarousel';
import useFriendInfoCarousel from './hooks/useFriendInfoCarousel';

const Carousel = () => {
	const { handlePrevClick, handleNextClick, visibleFriends } = useFriendInfoCarousel();

	return (
		<div className="flex h-[15rem] w-full max-w-[86.6rem] items-center justify-between gap-[6rem]">
			<ButtonArrowSVG direction={Direction.LEFT} onClick={handlePrevClick} />
			<div className="flex w-full min-w-0 justify-between">
				{visibleFriends().map((friend) => (
					<ContainerCarousel
						key={friend.id}
						image={friend.image}
						time={friend.time}
						name={friend.name}
						categoryname={friend.categoryName}
						isPlaying={friend.isPlaying}
					/>
				))}
			</div>
			<ButtonArrowSVG direction={Direction.RIGHT} onClick={handleNextClick} />
		</div>
	);
};

export default Carousel;
