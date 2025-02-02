import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import TextField from '@/shared/components/TextField/TextField';

import { isUrlValid } from '@/shared/utils/isUrlValid';

import type { PostInterestAreaReq } from '@/shared/types/api/onboarding';
import type { FieldType } from '@/shared/types/fileds';

import { FIELDS } from '@/shared/constants/fields';
import { SUGGESTED_STIES } from '@/shared/constants/suggestedSites';

import BackIcon from '@/shared/assets/svgs/ic_back_btn.svg?react';

import { useGetUrlName } from '@/shared/apisV2/common/common.mutations';
import { usePostInterestArea } from '@/shared/apisV2/onboarding/onboarding.mutations';

import AllowedService from './AllowedServices/AllowedServices';
import ButtonService from './ButtonService/ButtonService';
import Tabs from './Tabs/Tabs';

interface StepServiceProps {
	setStep: (step: string) => void;
	selectedField: FieldType | null;
}

const StepService = ({ setStep, selectedField }: StepServiceProps) => {
	const [activeTab, setActiveTab] = useState<FieldType>('비즈니스');
	const [inputURL, setInputURL] = useState('');
	const [selectedServices, setSelectedServices] = useState<PostInterestAreaReq['serviceList']>([]);
	const [inputSuccess, setInputSuccess] = useState(false);

	const navigate = useNavigate();

	const { mutateAsync: getUrlName } = useGetUrlName();
	const { mutate: postInterestArea } = usePostInterestArea();

	const handleAddSelectedService = async (url: string) => {
		const isExist = selectedServices.some((service) => service.siteUrl === url);

		if (!url || isExist) return;

		const response = await getUrlName({ url });
		setInputSuccess(true);
		const urlName = response?.data?.tabName;

		setSelectedServices((prev) => [...prev, { siteName: urlName, siteUrl: url }]);
	};

	const handleRemoveSelectedService = (url: string) => {
		setSelectedServices((prev) => prev.filter((service) => service.siteUrl !== url));
	};

	const handleChangeInputURL = (e: ChangeEvent<HTMLInputElement>) => {
		if (inputSuccess) {
			setInputSuccess(false);
		}

		setInputURL(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
			handleAddSelectedService(inputURL);
		}
	};

	const handleChangeActiveTab = (tab: FieldType) => {
		setActiveTab(tab);
	};

	const handleComplete = () => {
		if (!selectedField) {
			alert('필드를 먼저 선택해주세요');
			setStep('field');
		} else {
			postInterestArea(
				{ serviceList: selectedServices, interestArea: selectedField },
				{
					onSuccess: () => {
						navigate('/home');
					},
				},
			);
		}
	};

	return (
		<AutoFixedGrid fixedSide="right" fixedWidth="48.7rem" className="bg-gray-bg-01">
			<AutoFixedGrid.Slot>
				<main className="relative flex h-full min-h-0 flex-col">
					<button onClick={() => setStep('field')} className="absolute left-[6rem] top-[6rem]">
						<BackIcon />
					</button>

					<div className="flex min-h-0 flex-1 flex-col pb-[4.8rem] pl-[6rem] pr-[4.2rem] pt-[15rem]">
						<h1 className="mb-[2rem] text-white title-bold-36">작업 시 사용할 서비스들을 입력해주세요</h1>
						<p className="mb-[2.3rem] text-gray-04 body-reg-24">
							필요한 서비스에만 들어가고, 나의 온전한 집중 시간을 기록할 수 있어요. <br />
							만든 모립세트는 언제든 편집할 수 있어요.
						</p>

						<Tabs activeTab={activeTab} onChangeActiveTab={handleChangeActiveTab}>
							<Tabs.TriggerList>
								{FIELDS.map((field) => (
									<Tabs.Trigger value={field} key={field} />
								))}
							</Tabs.TriggerList>

							<Tabs.ContentList>
								{SUGGESTED_STIES[activeTab].map((site) => (
									<ButtonService
										key={site.url}
										title={site.title}
										url={site.url}
										onAddSelectedService={handleAddSelectedService}
									/>
								))}
							</Tabs.ContentList>
						</Tabs>

						<TextField
							value={inputURL}
							onKeyDown={handleKeyDown}
							onChange={handleChangeInputURL}
							isError={inputURL.length > 0 && !isUrlValid(inputURL)}
							errorMessage="알맞은 형식의 url을 입력해 주세요."
							isSuccess={inputURL.length > 0 && inputSuccess}
							successMessage="url 입력에 성공했어요."
							placeholder="직접 url 입력하기"
						>
							<TextField.ClearButton onClick={() => setInputURL('')} />
							<TextField.ConfirmButton disabled={inputURL === ''} onClick={() => handleAddSelectedService(inputURL)}>
								등록하기
							</TextField.ConfirmButton>
						</TextField>
					</div>
				</main>
			</AutoFixedGrid.Slot>

			<AutoFixedGrid.Slot>
				<AllowedService>
					<AllowedService.Header />
					<AllowedService.List>
						{selectedServices.map((service) => (
							<AllowedService.Item
								key={service.siteUrl}
								siteUrl={service.siteUrl}
								siteName={service.siteName}
								onClick={handleRemoveSelectedService}
							/>
						))}
					</AllowedService.List>
					<AllowedService.BottomButton onClick={handleComplete}>모두 입력했어요</AllowedService.BottomButton>
				</AllowedService>
			</AutoFixedGrid.Slot>
		</AutoFixedGrid>
	);
};

export default StepService;
