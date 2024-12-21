import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import useClickOutside from '@/shared/hooks/useClickOutside';

import {
	useDeleteCategory,
	useGetAllCategoryTask,
	useGetTargetTime,
	usePostCreateTodayTodos,
} from '@/shared/apis/home/queries';

import { getThisWeekRange } from '@/shared/utils/date';
import { getDailyCategoryTask, isTaskExist, splitTasksByCompletion } from '@/shared/utils/homePage';

import { Task } from '@/shared/types/home';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/shared/assets/svgs/large_plus.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import ButtonSVG from '../../shared/components/ButtonSVG';
import BoxCategory from './BoxCategory/BoxCategory';
import BoxTodayTodo from './BoxTodayTodo/BoxTodayTodo';
import ButtonMoreFriends from './ButtonMoreFriends/ButtonMoreFriends';
import ButtonUserProfile from './ButtonUserProfile/ButtonUserProfile';
import DatePicker from './DatePicker/DatePicker';
import { ModalContentsCategory, ModalContentsFriends } from './ModalContents/index';
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

	const { data: categoriesData, isError, error } = useGetAllCategoryTask(startDate, endDate);

	const categories = categoriesData?.data || [];
	const dailyCategoryTask = getDailyCategoryTask(selectedDate, categories);

	const [addingTodayTodoStatus, setAddingTodayTodoStatus] = useState(false);
	const [addingComplete, setAddingComplete] = useState(false);
	const addTodayTodoOverlayStyle = addingTodayTodoStatus && !addingComplete ? 'opacity-30 pointer-events-none' : '';

	const [todayTodos, setTodayTodos] = useState<Omit<Task, 'isComplete'>[]>([]);

	const { mutate: createTodayTodos } = usePostCreateTodayTodos();
	const { mutate: deleteCategory } = useDeleteCategory();

	const navigate = useNavigate();

	const updateTodayTodos = (todo: Omit<Task, 'isComplete'>) => {
		const canAddTask = !todayTodos.some((prevTodo) => prevTodo.id === todo.id);
		if (canAddTask) setTodayTodos((prev) => [...prev, todo]);
		else setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const {
		data: targetTimeData,
		error: targetTimeError,
		isError: isTargetTimeError,
	} = useGetTargetTime(formattedTodayDate);

	const { targetTime } = targetTimeData?.data || 0;

	const handleOpenCategoryModal = () => {
		categoryModalRef.current?.open();
	};

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};
	const handleCloseFriendsModal = () => {
		friendsModalRef.current?.close();
	};

	const queryClient = useQueryClient();

	useClickOutside(friendModalContentRef, handleCloseFriendsModal);

	const handleCloseModal = () => {
		categoryModalRef.current?.close();
		queryClient.invalidateQueries({ queryKey: ['categories'] });
		queryClient.invalidateQueries({ queryKey: ['msets'] });
	};

	const deleteTodayTodos = (todo: Omit<Task, 'isComplete'>) => {
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
			todayDate: formattedTodayDate,
			todayTodos: {
				taskIdList: todayTodoData,
			},
		};

		createTodayTodos(dataToPost, {
			onSuccess: () => {
				navigate(ROUTES_CONFIG.timer.path);
			},
		});
	};

	const handleDeleteCategory = (userId: number) => {
		deleteCategory(userId);
	};

	if (isError) {
		console.error(error);
	}

	if (isTargetTimeError) {
		console.error(targetTimeError);
	}

	return (
		<div className="flex h-screen w-[calc(100vw-7.4rem)] overflow-auto bg-gray-bg-01 p-[4.2rem]">
			<div className={`absolute right-[4.2rem] top-[5.4rem] flex gap-[0.8rem] ${addTodayTodoOverlayStyle}`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<div className="grid h-full w-full grid-cols-[1fr,40.2rem]">
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
											<ButtonSVG className="flex-shrink-0" onClick={handleOpenCategoryModal}>
												<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
											</ButtonSVG>
										</div>
									)}
								</>
							) : (
								<StatusDefaultHome onClick={handleOpenCategoryModal} />
							)}
						</div>
						{dailyCategoryTask.length > 2 && (
							<div className="mx-[2.2rem] flex flex-col">
								<ButtonSVG className="flex-shrink-0" onClick={handleOpenCategoryModal}>
									<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
								</ButtonSVG>
							</div>
						)}
					</div>
				</main>

				<BoxTodayTodo
					time={targetTime}
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
			</div>

			<ModalWrapper ref={categoryModalRef} backdrop={true}>
				<ModalContentsCategory handleCloseModal={handleCloseModal} />
			</ModalWrapper>

			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				<ModalContentsFriends ref={friendModalContentRef} />
			</ModalWrapper>
		</div>
	);
};

export default HomePage;
