import { useRef } from 'react';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';
import ModalContentsFriends from '@/shared/components/ModalContentsFriends/ModalContentsFriends';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';

import { Direction } from '@/shared/types/global';

import { useGetTimerFriends } from '@/shared/apisV2/timer/timer.queries';

import ContainerCarousel from './ContainerCarousel/ContainerCarousel';

const Carousel = () => {
	const friendsModalRef = useRef<ModalWrapperRef>(null);
	const { data: friendsList } = useGetTimerFriends();

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};

	return (
		<div className="flex h-[15rem] w-full max-w-[86.6rem] items-center justify-between gap-[6rem]">
			<ButtonArrowSVG direction={Direction.LEFT} />
			<div className="flex w-full min-w-0 justify-between">
				{friendsList?.data.length === 0 ? (
					<div className="flex h-full w-full flex-col items-center justify-center gap-y-[1.6rem]">
						<h3 className="text-gray-04 subhead-bold-20">함께 몰입할 친구를 추가해보아요!</h3>
						<ButtonRadius8.Md onClick={handleOpenFriendsModal}>친구 추가하기</ButtonRadius8.Md>
					</div>
				) : (
					<>
						{friendsList?.data.map((friend) => (
							<ContainerCarousel
								key={friend.id}
								image={friend.imageUrl}
								time={friend.elapsedTime}
								name={friend.name}
								categoryname={friend.categoryName || ''}
								isPlaying={friend.isOnline}
							/>
						))}
					</>
				)}
			</div>
			<ButtonArrowSVG direction={Direction.RIGHT} />
			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				<ModalContentsFriends />
			</ModalWrapper>
		</div>
	);
};

export default Carousel;
