import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { getThisWeekRange } from '@/shared/utils/date';
import { getDailyCategoryTask, isTaskExist, splitTasksByCompletion } from '@/shared/utils/tasks';

import { TaskType } from '@/shared/types/tasks';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/shared/assets/svgs/large_plus.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { useDeleteCategory, usePostAddTodayTodos } from '@/shared/apisV2/home/home.mutations';
import { useGetCategoryTask, useGetWorkTime } from '@/shared/apisV2/home/home.queries';

import BoxCategory from './BoxCategory/BoxCategory';
import BoxTodayTodo from './BoxTodayTodo/BoxTodayTodo';
import ButtonMoreFriends from './ButtonMoreFriends/ButtonMoreFriends';
import ButtonUserProfile from './ButtonUserProfile/ButtonUserProfile';
import DatePicker from './DatePicker/DatePicker';
import ModalContentsFriends from './ModalContentsFriends/ModalContentsFriends';
import StatusDefaultHome from './StatusDefaultHome/StatusDefaultHome';

dayjs.extend(utc);
dayjs.extend(timezone);

//TODO: 반응형 구조를 크게 변경해야해서 추후 pr에서 반영
const HomePage = () => {
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');

	const categoryModalRef = useRef<ModalWrapperRef>(null);
	const friendsModalRef = useRef<ModalWrapperRef>(null);
	// NOTE: backdrop이 있으면 전체영역이 modal로 잡혀서 바깥영역을 클릭해도 modal이 닫히지 않음, 따라서 아래 모달로 모달 닫기를 구현
	const friendModalContentRef = useRef<HTMLDivElement>(null);

	const [selectedDate, setSelectedDate] = useState(todayDate);
	const { startDate, endDate } = getThisWeekRange(selectedDate);

	const { data: categoriesData } = useGetCategoryTask({ startDate, endDate });

	const categories = categoriesData?.data || [];

	const dailyCategoryTask = getDailyCategoryTask(selectedDate, categories);

	const [addingTodayTodoStatus, setAddingTodayTodoStatus] = useState(false);
	const [addingComplete, setAddingComplete] = useState(false);
	const addTodayTodosOverlayStyle = addingTodayTodoStatus && !addingComplete ? 'opacity-30 pointer-events-none' : '';

	const [todayTodos, setTodayTodos] = useState<Omit<TaskType, 'isComplete'>[]>([]);

	const { mutate: addTodayTodos } = usePostAddTodayTodos();
	const { mutate: deleteCategory } = useDeleteCategory();

	const navigate = useNavigate();

	const updateTodayTodos = (todo: Omit<TaskType, 'isComplete'>) => {
		const canAddTask = !todayTodos.some((prevTodo) => prevTodo.id === todo.id);
		if (canAddTask) setTodayTodos((prev) => [...prev, todo]);
		else setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const { data: workTimeData } = useGetWorkTime({ targetDate: formattedTodayDate });

	const handleOpenCategoryModal = () => {
		categoryModalRef.current?.open();
	};

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};
	const handleCloseFriendsModal = () => {
		friendsModalRef.current?.close();
	};

	useClickOutside(friendModalContentRef, handleCloseFriendsModal);

	const deleteTodayTodos = (todo: Omit<TaskType, 'isComplete'>) => {
		setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const disableAddingTodayTodo = () => {
		setTodayTodos([]);
		setAddingTodayTodoStatus(false);
	};

	const enableAddingTodayTodo = () => {
		setAddingTodayTodoStatus(true);
	};

	const handleSelectedDateChange = (date: Dayjs) => {
		setSelectedDate(date);
	};

	const getSelectedNumber = (id: number) => {
		const index = todayTodos.findIndex((task) => task.id === id);
		const todoNumber = index === -1 ? 0 : index + 1;
		return todoNumber;
	};

	const enableComplete = () => {
		setAddingComplete(true);
	};

	const cancelComplete = () => {
		setAddingComplete(false);
	};

	const handleCreateTodayTodos = () => {
		const todayTodoData = todayTodos.map((todo) => todo.id);
		const dataToPost = {
			targetDate: formattedTodayDate,
			taskList: todayTodoData,
		};

		addTodayTodos(dataToPost, {
			onSuccess: () => {
				navigate(ROUTES_CONFIG.timer.path);
			},
		});
	};

	const handleDeleteCategory = (categoryId: number) => {
		deleteCategory({ categoryId });
	};

	return (
		<div className="flex h-screen w-[calc(100vw-7.4rem)] overflow-auto bg-gray-bg-01 p-[4.2rem]">
			<div className={`absolute right-[4.2rem] top-[5.4rem] flex gap-[0.8rem] ${addTodayTodosOverlayStyle}`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<AutoFixedGrid fixedSide="right" height="h-full" fixedWidth="40.2rem">
				<AutoFixedGrid.Slot>
					<main className="flex h-full flex-col gap-[1.6rem]">
						<div className="flex items-center gap-[1.8rem]">
							<ButtonUserProfile isMyProfile />
							<ul className="flex gap-[1.8rem]">
								<li>
									<ButtonUserProfile isConnecting />
								</li>
								<li>
									<ButtonUserProfile isConnecting />
								</li>
								<li>
									<ButtonUserProfile isConnecting />
								</li>
							</ul>
							<ButtonMoreFriends friendsCount={12} />
						</div>

						<DatePicker
							todayDate={todayDate}
							selectedDate={selectedDate}
							onSelectedDateChange={handleSelectedDateChange}
						/>

						<div className="flex h-full w-full">
							<div className="flex h-full w-0 flex-1 gap-[2.8rem] overflow-x-auto">
								{dailyCategoryTask.length !== 0 ? (
									<>
										{dailyCategoryTask.map(({ category, tasks }) => {
											const { completedTasks, ongoingTasks } = splitTasksByCompletion(tasks);
											return (
												<BoxCategory
													id={category.id}
													key={category.id}
													title={category.name}
													ongoingTodos={ongoingTasks}
													completedTodos={completedTasks}
													updateTodayTodos={updateTodayTodos}
													addingTodayTodoStatus={addingTodayTodoStatus}
													getSelectedNumber={getSelectedNumber}
													addingComplete={addingComplete}
													onDeleteCategory={handleDeleteCategory}
												/>
											);
										})}
										{dailyCategoryTask.length <= 2 && (
											<div className="flex flex-col">
												<button className="flex-shrink-0" onClick={handleOpenCategoryModal}>
													<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
												</button>
											</div>
										)}
									</>
								) : (
									<StatusDefaultHome onClick={handleOpenCategoryModal} />
								)}
							</div>
							{dailyCategoryTask.length > 2 && (
								<div className="mx-[2.2rem] flex flex-col">
									<button className="flex-shrink-0" onClick={handleOpenCategoryModal}>
										<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
									</button>
								</div>
							)}
						</div>
					</main>
				</AutoFixedGrid.Slot>

				<AutoFixedGrid.Slot>
					<BoxTodayTodo
						time={workTimeData?.data?.sumTodayElapsedTime || 0}
						addingTodayTodoStatus={addingTodayTodoStatus}
						selectedTodayTodos={todayTodos}
						hasTodos={isTaskExist(dailyCategoryTask)}
						enableAddingTodayTodo={enableAddingTodayTodo}
						disableAddingTodayTodo={disableAddingTodayTodo}
						deleteTodayTodos={deleteTodayTodos}
						getSelectedNumber={getSelectedNumber}
						enableComplete={enableComplete}
						cancelComplte={cancelComplete}
						addingComplete={addingComplete}
						onCreateTodayTodos={handleCreateTodayTodos}
					/>
				</AutoFixedGrid.Slot>
			</AutoFixedGrid>

			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				<ModalContentsFriends ref={friendModalContentRef} />
			</ModalWrapper>
		</div>
	);
};

export default HomePage;
