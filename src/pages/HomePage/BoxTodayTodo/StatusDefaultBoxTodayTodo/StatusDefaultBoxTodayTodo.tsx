import HomeLargeBtn from '@/shared/components/Button/ButtonHomeLarge/ButtonHomeLarge';

import { HomeLargeBtnVariant } from '@/shared/types/global';

import { LARGE_BTN_TEXT } from '@/shared/constants/btnText';

interface StatusDefaultBoxTodayTodoProps {
	hasTodos: boolean;
	onEnableAddStatus: () => void;
}

const StatusDefaultBoxTodayTodo = ({ hasTodos, onEnableAddStatus }: StatusDefaultBoxTodayTodoProps) => {
	return (
		<div className="mt-[21.4rem] flex w-full flex-col justify-center text-white">
			<p className="text-center text-gray-03 subhead-med-18">아직 오늘 할 일이 없어요</p>
			<p className="mb-[2.2rem] mt-[1.2rem] text-center text-gray-05 subhead-bold-22">
				할 일을 추가해
				<br />
				타이머를 시작해보세요.
			</p>
			<div className="mx-auto">
				<HomeLargeBtn variant={HomeLargeBtnVariant.MIDDLE} disabled={!hasTodos} onClick={onEnableAddStatus}>
					{LARGE_BTN_TEXT.ADD_TODAY_TODO}
				</HomeLargeBtn>
			</div>
		</div>
	);
};

export default StatusDefaultBoxTodayTodo;
