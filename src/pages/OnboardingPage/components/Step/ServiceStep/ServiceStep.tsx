import { BackIcon } from '../assets/svgs';
import { BoxAllowedService, ButtonService, Tabs } from './components';

interface ServiceStepProps {
	setStep: (step: string) => void;
	activeTab: string;
	onChangeActiveTab: (tab: string) => void;
	FIELDS: string[];
}

const ServiceStep = ({ setStep, activeTab, onChangeActiveTab, FIELDS }: ServiceStepProps) => {
	return (
		<div className="grid w-full grid-cols-[1fr,48.7rem] bg-gray-bg-01">
			<main className="relative flex w-full pb-[4.8rem] pl-[6rem] pr-[4.2rem] pt-[15rem]">
				<button
					onClick={() => {
						setStep('field');
					}}
					className="absolute left-[6rem] top-[6rem]"
				>
					<BackIcon />
				</button>

				<div className="flex flex-col justify-between">
					<div>
						<h1 className="title-bold-36 mb-[2rem] text-white">작업 시 사용할 서비스들을 입력해주세요</h1>
						<p className="body-reg-24 mb-[2.3rem] text-gray-04">
							필요한 서비스에만 들어가고, 나의 온전한 집중 시간을 기록할 수 있어요. 만든 모립세트는 언제든 편집할 수
							있어요.
						</p>

						<Tabs.Root activeTab={activeTab} onChangeActiveTab={onChangeActiveTab}>
							<Tabs.TriggerList>
								{[...FIELDS, '기타'].map((field) => (
									<Tabs.Trigger value={field} key={field} />
								))}
							</Tabs.TriggerList>

							<Tabs.ContentList>
								<Tabs.Content value="비즈니스">
									<div className="flex w-full flex-wrap gap-x-[2rem] gap-y-[2.3rem]">
										<ButtonService />
										<ButtonService />
										<ButtonService />
										<ButtonService />
									</div>
								</Tabs.Content>
							</Tabs.ContentList>
						</Tabs.Root>
					</div>

					<div className="flex h-[6.6rem] items-center justify-between rounded-[8px] bg-gray-bg-02 py-[1rem] pl-[2rem] pr-[1rem]">
						<input
							className="subhead-med-18 flex flex-grow bg-transparent text-gray-04"
							placeholder="직접 url 입력하기"
						/>

						<button className="body-semibold-16 ml-[2rem] rounded-[5px] bg-gray-bg-05 px-[2.2rem] py-[1.2rem] text-gray-04">
							등록하기
						</button>
					</div>
				</div>
				{/* <button onClick={() => setStep('service')}>다음</button> */}
			</main>

			<BoxAllowedService />
		</div>
	);
};

export default ServiceStep;
