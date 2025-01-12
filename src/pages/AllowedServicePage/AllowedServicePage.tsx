import { useEffect, useRef, useState } from 'react';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';

import ModalContentsFriends from '@/pages/HomePage/ModalContentsFriends/ModalContentsFriends';

import BoxMakeAllowedService from './BoxMakeAllowedService/BoxMakeAllowedService';
import BoxRecommendService from './BoxRecommendService/BoxRecommendService';
import CategoryAllowedService from './CategoryAllowedService/CategoryAllowedService';
import { AllowedService, UrlInfo } from './types';

const AllowedServicePage = () => {
	const friendsModalRef = useRef<ModalWrapperRef>(null);
	const friendModalContentRef = useRef<HTMLDivElement>(null);

	const [allowedServices, setAllowedServices] = useState<AllowedService[]>([
		{
			id: Date.now(),
			allowedServiceName: '',
			selectedColor: 'bg-gray-bg-07',
			urlList: [],
		},
	]);
	const [activeAllowedServiceId, setActiveAllowedServiceId] = useState<number>(allowedServices[0].id);
	const [selectedTabId, setSelectedTabId] = useState(CATEGORY_MODALTABS[0].id);

	const handleTabChange = (tab: number) => {
		setSelectedTabId(tab);
	};

	const handleAddAllowedService = () => {
		const newSet: AllowedService = {
			id: Date.now(),
			allowedServiceName: '',
			selectedColor: 'bg-gray-bg-07',
			urlList: [],
		};
		setAllowedServices((prev) => [...prev, newSet]);
		setActiveAllowedServiceId(newSet.id);
	};

	const handleUpdateAllowedService = <T extends keyof AllowedService>(id: number, key: T, value: AllowedService[T]) => {
		setAllowedServices((prev) =>
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

	const handleDeleteAllowedService = (id: number) => {
		const updatedAllowedServices = allowedServices.filter((allowedService) => allowedService.id !== id);
		if (updatedAllowedServices.length === 0) {
			return;
		}
		setAllowedServices(updatedAllowedServices);
	};

	const handleAddUrlToAllowedService = (urlInfo: UrlInfo) => {
		setAllowedServices((prev) =>
			prev.map((set) =>
				set.id === activeAllowedServiceId
					? {
							...set,
							urlList: [...set.urlList, urlInfo],
						}
					: set,
			),
		);
	};

	useEffect(() => {
		if (allowedServices.length > 0 && !allowedServices.find((set) => set.id === activeAllowedServiceId)) {
			setActiveAllowedServiceId(allowedServices[allowedServices.length - 1].id);
		}
	}, [allowedServices, activeAllowedServiceId]);

	const activeAllowedService = allowedServices.find((set) => set.id === activeAllowedServiceId);

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};
	const handleCloseFriendsModal = () => {
		friendsModalRef.current?.close();
	};

	useClickOutside(friendModalContentRef, handleCloseFriendsModal);

	return (
		<div className="flex h-screen w-screen bg-gray-bg-01">
			<div className={`absolute right-[13.4rem] top-[5.4rem] flex gap-[0.8rem]`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<div className="my-[4.2rem] flex">
				<CategoryAllowedService
					allowedServices={allowedServices}
					activeAllowedServiceId={activeAllowedServiceId}
					setActiveAllowedServiceId={setActiveAllowedServiceId}
					addAllowedService={handleAddAllowedService}
					deleteAllowedService={handleDeleteAllowedService}
				/>

				<div className="ml-[4.2rem] mt-[6.8rem]">
					{activeAllowedService && (
						<BoxMakeAllowedService
							allowedService={activeAllowedService}
							updateAllowedService={(key, value) => handleUpdateAllowedService(activeAllowedServiceId, key, value)}
							handleTabChange={handleTabChange}
							selectedTabId={selectedTabId}
						/>
					)}

					<div className="mt-[4.2rem]">
						<BoxRecommendService addUrlToAllowedService={handleAddUrlToAllowedService} selectedTabId={selectedTabId} />
					</div>
				</div>
			</div>

			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				<ModalContentsFriends ref={friendModalContentRef} />
			</ModalWrapper>
		</div>
	);
};

export default AllowedServicePage;
