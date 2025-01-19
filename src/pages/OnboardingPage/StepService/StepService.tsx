import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

	const navigate = useNavigate();

	const { mutateAsync: getUrlName } = useGetUrlName();
	const { mutate: postInterestArea } = usePostInterestArea();

	const handleAddSelectedService = async (url: string) => {
		const isExist = selectedServices.some((service) => service.siteUrl === url);

		if (!url || isExist) return;

		const response = await getUrlName({ url });
		const urlName = response?.data?.tabName;

		setSelectedServices((prev) => [...prev, { siteName: urlName, siteUrl: url }]);
		setInputURL('');
	};

	const handleRemoveSelectedService = (url: string) => {
		setSelectedServices((prev) => prev.filter((service) => service.siteUrl !== url));
	};

	const handleChangeInputURL = (e: ChangeEvent<HTMLInputElement>) => {
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
		<div className="grid h-screen w-full grid-cols-[1fr,48.7rem] bg-gray-bg-01">
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

					<div className="mt-auto flex h-[6.6rem] shrink-0 items-center justify-between rounded-[8px] bg-gray-bg-02 py-[1rem] pl-[2rem] pr-[1rem]">
						<input
							value={inputURL}
							onKeyDown={handleKeyDown}
							onChange={handleChangeInputURL}
							className="flex flex-grow bg-transparent text-gray-04 subhead-med-18 focus:outline-none"
							placeholder="직접 url 입력하기"
						/>
						<button
							onClick={() => handleAddSelectedService(inputURL)}
							disabled={inputURL === ''}
							className={`ml-[2rem] rounded-[5px] px-[2.2rem] py-[1.2rem] body-semibold-16 ${
								inputURL
									? 'bg-main-gra-01 text-gray-01 hover:bg-main-gra-hover active:bg-main-gra-press'
									: 'bg-gray-bg-05 text-gray-04'
							}`}
						>
							등록하기
						</button>
					</div>
				</div>
			</main>

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
		</div>
	);
};

export default StepService;
