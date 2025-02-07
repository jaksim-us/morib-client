import { useEffect, useRef, useState } from 'react';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';

import ModalContentsFriends from '@/pages/HomePage/ModalContentsFriends/ModalContentsFriends';

import AllowedServiceList from './AllowedServiceList/AllowedServiceList';
import AllowedServiceTitle from './AllowedServiceTitle/AllowedServiceTitle';
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
	const [allowedServiceTitleInput, setAllowedServiceTitleInput] = useState('');

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
		<AutoFixedGrid type="allowedService" className="gap-[3rem] bg-gray-bg-01 px-[3.6rem] py-[4.2rem]">
			<div className={`absolute right-[4.2rem] top-[5.4rem] flex gap-[0.8rem]`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<AutoFixedGrid.Slot className="flex h-full min-h-0 w-full flex-col items-start gap-[2rem]">
				<AllowedServiceList>
					<AllowedServiceList.Header>
						<AllowedServiceList.Title>나의 허용서비스 리스트</AllowedServiceList.Title>
						<AllowedServiceList.PlusButton onClick={handleAddAllowedService} />
					</AllowedServiceList.Header>

					<AllowedServiceList.Content>
						{new Array(12).fill(0).map((_, index) => (
							<AllowedServiceList.Item key={index} />
						))}
					</AllowedServiceList.Content>
				</AllowedServiceList>
			</AutoFixedGrid.Slot>

			<AutoFixedGrid.Slot className="flex h-full min-h-0 w-full min-w-[894px] flex-col gap-y-[1.9rem]">
				<Spacer.Height className="flex flex-col gap-[2rem]">
					<AllowedServiceTitle>
						<AllowedServiceTitle.ColorButton color="bg-gray-bg-07" />
						<AllowedServiceTitle.Input placeholder="모립세트 이름을 입력해주세요." />
					</AllowedServiceTitle>

					{activeAllowedService && (
						<BoxMakeAllowedService
							allowedService={activeAllowedService}
							updateAllowedService={(key, value) => handleUpdateAllowedService(activeAllowedServiceId, key, value)}
						/>
					)}
				</Spacer.Height>

				<BoxRecommendService addUrlToAllowedService={handleAddUrlToAllowedService} />
			</AutoFixedGrid.Slot>
		</AutoFixedGrid>
	);
};

export default AllowedServicePage;
