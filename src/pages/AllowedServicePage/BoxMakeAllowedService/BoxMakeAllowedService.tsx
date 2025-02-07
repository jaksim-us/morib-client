import { ChangeEvent, useState } from 'react';

import Spacer from '@/shared/components/Spacer/Spacer';
import TextField from '@/shared/components/TextField/TextField';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import { AllowedService } from '../types';
import BoxUrlList from './BoxUrlList/BoxUrlList';
import TabCategorySelect from './TabCategorySelect/TabCategorySelect';
import TableAllowedService from './TableAllowedService/TableAllowedService';

interface BoxMakeAllowedServiceProps {
	allowedService: AllowedService;
	updateAllowedService: <T extends keyof AllowedService>(key: T, value: AllowedService[T]) => void;
}

const BoxMakeAllowedService = ({ allowedService, updateAllowedService }: BoxMakeAllowedServiceProps) => {
	const { allowedServiceName, selectedColor, urlList } = allowedService;
	const [isPaletteOpen, setIsPaletteOpen] = useState(false);
	const [selectedTabId, setSelectedTabId] = useState(CATEGORY_MODALTABS[0].id);

	const handleColorPalleteOpen = () => {
		setIsPaletteOpen((prev) => !prev);
	};

	const handleColorSelect = (color: string) => {
		updateAllowedService('selectedColor', color);
		setIsPaletteOpen(false);
	};

	const handleMoribNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateAllowedService('allowedServiceName', e.target.value);
	};

	const handleTabChange = (tab: number) => {
		setSelectedTabId(tab);
	};
	const handleDeleteUrlInfo = (urlToDelete: string) => {
		const updatedUrlList = urlList.filter((urlInfo) => urlInfo.url !== urlToDelete);
		updateAllowedService('urlList', updatedUrlList);
	};

	const addUrl = (url: string) => {
		try {
			const domain = new URL(url).hostname;
			const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

			updateAllowedService('urlList', [
				...urlList,
				{
					siteName: domain.replace(/^www\./, '').replace(/\.[a-z]{2,}$/, ''),
					page: domain, //api로 받은 값
					url,
					faviconUrl,
				},
			]);
		} catch (error) {
			console.error('Invalid URL:', error);
		}
	};

	return (
		<Spacer className="relative flex flex-col items-start gap-[2rem]">
			<div className="flex items-center gap-[0.3rem] self-stretch">
				<TabCategorySelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} selectedTabId={selectedTabId} />
			</div>

			{selectedTabId === CATEGORY_MODALTABS[0].id && (
				<>
					<div className="relative w-full">
						<TextField value={allowedServiceName} onChange={handleMoribNameChange}>
							<TextField.ClearButton />
							<TextField.ConfirmButton>허용서비스 추가하기</TextField.ConfirmButton>
						</TextField>
						{/* <InputAllowedServiceUrl urlList={urlList} addUrl={addUrl} /> */}
					</div>
					<TableAllowedService urlList={urlList}>
						<BoxUrlList urlList={urlList} onDelete={handleDeleteUrlInfo} />
					</TableAllowedService>
				</>
			)}
		</Spacer>
	);
};

export default BoxMakeAllowedService;
