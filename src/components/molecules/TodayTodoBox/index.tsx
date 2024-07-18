import { convertTime } from '@/utils/time';

import { Task } from '@/types/home';

import TodayTodoBoxDefaultStatus from './TodayTodoBoxAddStatus';
import TodayTodoBoxAddStatus from './TodayTodoBoxDefaultStatus';

interface TodayTodoBoxProps {
	time: number;
	addingTodayTodoStatus: boolean;
	selectedTodayTodos: Omit<Task, 'isComplete'>[];
	hasTodos: boolean;
	enableAddingTodayTodo: () => void;
	disableAddingTodayTodo: () => void;
	deleteTodayTodos: (todo: Omit<Task, 'isComplete'>) => void;
	getSelectedNumber: (id: number) => number;
	enableComplete: () => void;
	cancelComplte: () => void;
	addingComplete: boolean;
	onCreateTodayTodos: () => void;
}

const TodayTodoBox = ({
	addingTodayTodoStatus,
	time = 0,
	selectedTodayTodos,
	hasTodos = false,
	enableAddingTodayTodo,
	disableAddingTodayTodo,
	deleteTodayTodos,
	getSelectedNumber,
	enableComplete,
	cancelComplte,
	addingComplete,
	onCreateTodayTodos,
}: TodayTodoBoxProps) => {
	const { hours, minutes, seconds } = convertTime(time);

	return (
		<div className="flex h-[88.6rem] w-[40.2rem] flex-col rounded-[1.6rem] bg-gray-bg-03 p-[1.8rem]">
			<div className="rounded-[0.8rem] bg-gray-bg-05 pb-[1.8rem] pl-[2.6rem] pt-[2.2rem] text-white">
				<p className="head-bold-24">몰입 시간</p>
				<p className="title-bold-32">{`${hours}시간 ${minutes}분 ${seconds}초`}</p>
			</div>
			<h3 className="head-bold-24 mt-[3.2rem] text-white">오늘 할 일</h3>
			{addingTodayTodoStatus ? (
				<TodayTodoBoxAddStatus
					selectedTodayTodos={selectedTodayTodos}
					onDisableAddStatus={disableAddingTodayTodo}
					deleteTodayTodos={deleteTodayTodos}
					getSelectedNumber={getSelectedNumber}
					enableComplete={enableComplete}
					cancelComplte={cancelComplte}
					addingComplete={addingComplete}
					onCreateTodayTodos={onCreateTodayTodos}
				/>
			) : (
				<TodayTodoBoxDefaultStatus hasTodos={hasTodos} onEnableAddStatus={enableAddingTodayTodo} />
			)}
		</div>
	);
};

export default TodayTodoBox;
