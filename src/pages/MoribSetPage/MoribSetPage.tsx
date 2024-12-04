import { useEffect, useRef, useState } from 'react';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import useClickOutside from '@/shared/hooks/useClickOutside';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';

import MoribSetPageWrapper from '@/components/templates/MoribSetPageWrapper/index';

import { ModalContentsFriends } from './../HomePage/components/ModalContents';
import SideBarHome from './../HomePage/components/SideBarHome';
import BoxMakeMoribSet from './components/Box/BoxMakeMoribSet';
import BoxRecommendService from './components/Box/BoxRecommendService';
import CategoryMoribSet from './components/CategoryMoribSet';
import { MoribSet, UrlInfo } from './types';

const MoribSetPage = () => {
	const friendsModalRef = useRef<ModalWrapperRef>(null);
	const friendModalContentRef = useRef<HTMLDivElement>(null);

	const [moribSets, setMoribSets] = useState<MoribSet[]>([
		{
			id: Date.now(),
			moribSetName: '',
			selectedColor: '#868C93',
			urlList: [],
		},
	]);
	const [activeMoribSetId, setActiveMoribSetId] = useState<number | null>(moribSets[0].id);

	const handleAddMoribSet = () => {
		const newSet: MoribSet = {
			id: Date.now(),
			moribSetName: '',
			selectedColor: '#868C93',
			urlList: [],
		};
		setMoribSets((prev) => [...prev, newSet]);
		setActiveMoribSetId(newSet.id);
	};

	const handleUpdateMoribSet = <T extends keyof MoribSet>(id: number, key: T, value: MoribSet[T]) => {
		setMoribSets((prev) =>
			prev.map((set) =>
				set.id === id
					? {
							...set,
							[key]: value,
						}
					: set,
			),
		);
	};

	const handleDeleteMoribSet = (id: number) => {
		const updatedMoribSets = moribSets.filter((moribSet) => moribSet.id !== id);
		if (updatedMoribSets.length === 0) {
			return;
		}
		setMoribSets(updatedMoribSets);
	};

	const handleAddUrlToMoribSet = (urlInfo: UrlInfo) => {
		setMoribSets((prev) =>
			prev.map((set) =>
				set.id === activeMoribSetId
					? {
							...set,
							urlList: [...set.urlList, urlInfo],
						}
					: set,
			),
		);
	};

	useEffect(() => {
		if (moribSets.length === 0) {
			setActiveMoribSetId(null);
		} else if (!moribSets.find((set) => set.id === activeMoribSetId)) {
			setActiveMoribSetId(moribSets[moribSets.length - 1].id);
		}
	}, [moribSets, activeMoribSetId]);

	const activeMoribSet = moribSets.find((set) => set.id === activeMoribSetId);

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};
	const handleCloseFriendsModal = () => {
		friendsModalRef.current?.close();
	};

	useClickOutside(friendModalContentRef, handleCloseFriendsModal);

	return (
		<MoribSetPageWrapper>
			<SideBarHome />

			<div className={`absolute right-[4.4rem] top-[5.4rem] flex gap-[0.8rem]`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<div className="my-[4.2rem] flex">
				<CategoryMoribSet
					moribSets={moribSets}
					activeMoribSetId={activeMoribSetId}
					setActiveMoribSetId={setActiveMoribSetId}
					addMoribSet={handleAddMoribSet}
					deleteMoribSet={handleDeleteMoribSet}
				/>

				<div className="ml-[4.2rem] mt-[6.8rem]">
					{activeMoribSetId && activeMoribSet && (
						<BoxMakeMoribSet
							moribSet={activeMoribSet}
							updateMoribSet={(key, value) => handleUpdateMoribSet(activeMoribSetId, key, value)}
						/>
					)}
					<div className="mt-[5.1rem]">
						<BoxRecommendService addUrlToMoribSet={handleAddUrlToMoribSet} />
					</div>
				</div>
			</div>

			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				<ModalContentsFriends ref={friendModalContentRef} />
			</ModalWrapper>
		</MoribSetPageWrapper>
	);
};

export default MoribSetPage;
