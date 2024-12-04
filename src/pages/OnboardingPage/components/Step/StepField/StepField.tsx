import { HomeLargeBtnVariant } from '@/shared/types/global';

import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';

interface StepFieldProps {
	setStep: (step: string) => void;
	onSelectField: (field: string) => void;
	selectedField: string[];
	FIELDS: string[];
}

const StepField = ({ setStep, onSelectField, selectedField, FIELDS }: StepFieldProps) => {
	return (
		<main className="flex min-h-screen w-full flex-col items-center overflow-auto pb-[18.2rem] pt-[18rem] 2xl:pb-0">
			<h1 className="title-bold-36 mb-[2rem] text-center text-white">주로 어떤 분야에 집중하시나요?</h1>
			<p className="body-reg-24 mb-[8.3rem] text-center text-gray-04">
				업무 분야에 자주 쓰이는 서비스들을 추천 해드릴게요
			</p>

			<div>
				<ul className="mb-[11.7rem] flex flex-wrap justify-center gap-[2rem]">
					{FIELDS.map((field) => (
						<li key={field}>
							<button
								onClick={() => onSelectField(field)}
								className={`head-bold-24 flex h-[28rem] w-[22rem] items-center justify-center rounded-[8px] text-white ${selectedField.includes(field) ? 'border border-mint-01 bg-gray-bg-02' : 'bg-gray-bg-03'}`}
							>
								{field}
							</button>
						</li>
					))}
				</ul>
			</div>

			<HomeLargeBtn
				variant={HomeLargeBtnVariant.LARGE}
				onClick={() => setStep('service')}
				disabled={selectedField.length === 0}
				className="mb-[2rem]"
			>
				다음으로 넘어가기
			</HomeLargeBtn>

			<button className="subhead-reg-22 text-gray-04">건너뛰기</button>
		</main>
	);
};

export default StepField;
