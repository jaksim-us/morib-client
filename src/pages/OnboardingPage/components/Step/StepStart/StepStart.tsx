import { HomeLargeBtnVariant } from '@/shared/types/global';

import { OnboardingIcon } from '@/shared/assets/home/svgs';

import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';

interface StepStartProps {
	setStep: (step: string) => void;
}

const StepStart = ({ setStep }: StepStartProps) => {
	return (
		<main className="flex w-full flex-col items-center justify-center">
			<h1 className="title-bold-36 mb-[2rem] text-center text-white">집중을 도와줄 모립세트를 만들어볼까요?</h1>
			<p className="body-reg-24 mb-[8.3rem] text-center text-gray-04">
				모립세트란 작업에 꼭 필요한 일만 할 수 있도록
				<br />
				설정하는 작업 시 사용 할 허용 서비스들의 모음을 말해요.
			</p>
			<OnboardingIcon className="mb-[8.3rem]" />

			<HomeLargeBtn variant={HomeLargeBtnVariant.LARGE} onClick={() => setStep('field')} className="mb-[2rem]">
				<span className="min-w-[15.6rem]">시작하기</span>
			</HomeLargeBtn>

			<button className="subhead-reg-22 text-gray-04">건너뛰기</button>
		</main>
	);
};

export default StepStart;
