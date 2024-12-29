import { ChangeEvent, useState } from 'react';

import ArrowSVGBtn from '@/shared/components/Button/ButtonArrowSVG/ButtonArrowSVG';
import CategoryTabSelect from '@/shared/components/CategoryTabSelect';

import { Direction } from '@/shared/types/global';

import { CATEGORY_MODALTABS } from '@/shared/constants/tabSelections';

import { AllowedService } from '../types';

import ColorPallete from '../ColorPallete/ColorPallete';
import InputAllowedServiceUrl from '../InputAllowedServiceUrl/InputAllowedServiceUrl';
import TableAllowedService from '../TableAllowedService/TableAllowedService';
import BoxUrlList from '../BoxUrlList/BoxUrlList';

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
		<div className="relative flex w-[132rem] flex-col items-start gap-[2rem]">
			<div className="flex items-center gap-[1.4rem]">
				<div className="flex items-center gap-[0.6rem]">
					<div className={`h-[3rem] w-[3rem] rounded-[31px] ${selectedColor}`} />
					<ArrowSVGBtn direction={Direction.DOWN} onClick={handleColorPalleteOpen} />
				</div>
				<input
					value={allowedServiceName}
					onChange={handleMoribNameChange}
					placeholder="모립세트 이름을 입력해주세요."
					className="title-bold-36 placeholder-text-gray-03 w-[114rem] flex-shrink-0 bg-transparent text-white focus:outline-none"
				/>
			</div>

			<ColorPallete isOpen={isPaletteOpen} onSelectColor={handleColorSelect} />

			<div className="flex items-center gap-[0.3rem] self-stretch">
				<CategoryTabSelect tabs={CATEGORY_MODALTABS} handleTabChange={handleTabChange} selectedTabId={selectedTabId} />
			</div>

			{selectedTabId === CATEGORY_MODALTABS[0].id && (
				<>
					<div className="relative w-full">
						<InputAllowedServiceUrl urlList={urlList} addUrl={addUrl} />
					</div>
					<TableAllowedService urlList={urlList}>
						<BoxUrlList urlList={urlList} onDelete={handleDeleteUrlInfo} />
					</TableAllowedService>
				</>
			)}
		</div>
	);
};

export default BoxMakeAllowedService;
