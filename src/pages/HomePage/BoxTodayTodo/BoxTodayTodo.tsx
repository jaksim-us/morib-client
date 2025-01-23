import { convertTime } from '@/shared/utils/time';

import type { TaskType } from '@/shared/types/tasks';

import StatusAddBoxTodayTodo from './StatusAddBoxTodayTodo/StatusAddBoxTodayTodo';
import StatusDefaultBoxTodayTodo from './StatusDefaultBoxTodayTodo/StatusDefaultBoxTodayTodo';

interface BoxTodayTodoProps {
	time: number;
	addingTodayTodoStatus: boolean;
	selectedTodayTodos: Omit<TaskType, 'isComplete'>[];
	hasTodos: boolean;
	enableAddingTodayTodo: () => void;
	disableAddingTodayTodo: () => void;
	deleteTodayTodos: (todo: Omit<TaskType, 'isComplete'>) => void;
	getSelectedNumber: (id: number) => number;
	enableComplete: () => void;
	cancelComplte: () => void;
	addingComplete: boolean;
	onCreateTodayTodos: () => void;
}

const BoxTodayTodo = ({
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
}: BoxTodayTodoProps) => {
	const { hours, minutes, seconds } = convertTime(time);

	return (
		<div className="flex h-full w-full flex-col justify-end">
			<div className="flex h-5/6 w-[40.2rem] flex-col rounded-[1.6rem] bg-gray-bg-03 p-[1.8rem]">
				<div className="rounded-[0.8rem] bg-gray-bg-05 pb-[1.8rem] pl-[2.6rem] pt-[2.2rem] text-white">
					<p className="head-bold-24">오늘 나의 몰입 시간</p>
					<p className="title-bold-32">{`${hours}시간 ${minutes}분 ${seconds}초`}</p>
				</div>
				<h3 className="mt-[3.2rem] text-white head-bold-24">오늘 할 일</h3>
				{addingTodayTodoStatus ? (
					<StatusAddBoxTodayTodo
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
					<StatusDefaultBoxTodayTodo hasTodos={hasTodos} onEnableAddStatus={enableAddingTodayTodo} />
				)}
			</div>
		</div>
	);
};

export default BoxTodayTodo;
