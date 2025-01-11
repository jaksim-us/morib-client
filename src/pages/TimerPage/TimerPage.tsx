import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useEffect, useMemo, useState } from 'react';

import { useGetMoribSet, usePostTimerStop } from '@/shared/apis/timer/queries';

import { splitTasksByCompletion } from '@/shared/utils/timer';
import { getBaseUrl } from '@/shared/utils/url';

import { DATE_FORMAT, DEFAULT_URL, TIMEZONE } from '@/shared/constants/timerPageText';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';
import HomeIcon from '@/shared/assets/svgs/btn_home.svg?react';

import { useGetTodoCard } from '@/shared/apisV2/timer/queries';

import Carousel from './Carousel/Carousel';
import PopoverAllowedService from './PopoverAllowedService/PopoverAllowedService';
import SideBarTimer from './SidebarTimer/SideBarTimer';
import TitleAllowedService from './TItleAllowedService/TitleAllowedService';
import Timer from './Timer/Timer';
import { useSelectedTodo } from './hooks/useSelectedTodo';
import { useTimerCount } from './hooks/useTimerCount';
import { useToggleSidebar } from './hooks/useToggleSidebar';
import { useUrlHandler } from './hooks/useUrlHandler';

dayjs.extend(utc);
dayjs.extend(timezone);

interface MoribSetData {
	url: string;
}

interface Task {
	id: number;
	name: string;
	startDate: string;
	endDate: string | null;
	targetTime: number;
	isComplete: boolean;
	categoryName: string;
}

const TimerPage = () => {
	const { mutate: stopTimer } = usePostTimerStop();
	const { isSidebarOpen, handleSidebarToggle } = useToggleSidebar();
	const todayDate = dayjs().tz(TIMEZONE);
	const formattedTodayDate = todayDate.format(DATE_FORMAT);
	const { data: todosData, isLoading, error } = useGetTodoCard(formattedTodayDate);

	const todos: Task[] = (todosData?.data?.task || []).map((todo: any, index: number) => ({
		id: index,
		name: todo.name,
		startDate: todo.startDate,
		endDate: todo.endDate,
		targetTime: parseInt(todo.elapsedTime, 10),
		isComplete: todo.isComplete,
		categoryName: todo.categoryName,
	}));

	const totalTimeOfToday = todosData?.data?.sumTodayElapsedTime || 0;

	const { ongoingTodos, completedTodos } = splitTasksByCompletion(todos);

	const [selectedTodo, setSelectedTodo] = useSelectedTodo(todos);

	const [registeredNames, setRegisteredNames] = useState<string[]>([]);

	const [targetTime, setTargetTime] = useState(0);

	const [isPlaying, setIsPlaying] = useState(false);

	const [isAllowedServiceVisible, setIsAllowedServiceVisible] = useState(false);

	const selectedTodoData = todos.find((todo: Task) => todo.id === selectedTodo);

	useEffect(() => {
		setTargetTime(selectedTodoData?.targetTime || 0);
	}, [selectedTodoData?.targetTime]);

	const { data: setData } = useGetMoribSet(selectedTodo || 0);
	const urls = useMemo(() => setData?.data.map(({ url }: MoribSetData) => url.trim()) || [], [setData]);

	const baseUrls = useMemo(() => {
		const mappedUrls = urls.map(getBaseUrl);
		return [...mappedUrls, DEFAULT_URL];
	}, [urls]);

	const {
		timer: timerTime,
		increasedTime: timerIncreasedTime,
		resetIncreasedTime: resetTimerIncreasedTime,
	} = useTimerCount({ isPlaying, previousTime: targetTime });

	const { timer: accumulatedTime, resetIncreasedTime: resetAccumulatedIncreasedTime } = useTimerCount({
		isPlaying,
		previousTime: totalTimeOfToday,
	});

	useUrlHandler({
		isPlaying,
		selectedTodo,
		baseUrls,
		stopTimer,
		formattedTodayDate,
		timerIncreasedTime,
		setIsPlaying,
		getBaseUrl,
	});

	const handleTodoSelection = (id: number) => {
		setSelectedTodo(id);
	};

	const handlePlayToggle = (isPlaying: boolean) => {
		setIsPlaying(isPlaying);
	};

	const handleMoribSetTitleClick = () => {
		setIsAllowedServiceVisible(true);
	};

	const handleCancelClick = () => {
		setIsAllowedServiceVisible(false);
	};

	const handleRegister = (selectedNames: string[]) => {
		setRegisteredNames(selectedNames);
		setIsAllowedServiceVisible(false);
	};

	const updateTargetTime = (newTime: number) => {
		setTargetTime(newTime);
	};

	if (isLoading || error) {
		return <div>{isLoading ? 'Loading...' : 'Error...'}</div>;
	}

	return (
		<div className="relative flex h-screen w-screen overflow-hidden bg-gray-bg-01">
			<div className="flex flex-col">
				<div className="relative flex w-screen justify-between">
					<TitleAllowedService
						onClick={handleMoribSetTitleClick}
						registeredNames={registeredNames}
						isAllowedServiceVisible={isAllowedServiceVisible}
					/>
					<div className="mr-[3.2rem] mt-[3.2rem] flex w-[10.8rem] items-center">
						<button className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04">
							<HomeIcon />
						</button>
						<button
							onClick={handleSidebarToggle}
							className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04"
						>
							<HamburgerIcon />
						</button>
					</div>
				</div>
				{isAllowedServiceVisible && (
					<div className="absolute top-[8rem] z-10 flex">
						<PopoverAllowedService onCancel={handleCancelClick} onRegister={handleRegister} />
					</div>
				)}

				<div
					className={`mt-[-0.8rem] flex h-screen min-h-[908px] w-screen min-w-[1080px] flex-col items-center justify-center transition-[padding-right] duration-300 ${isSidebarOpen ? 'pr-0 2xl:pr-[40.2rem]' : 'pr-0'}`}
				>
					<header className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
						<h1 className="text-white title-semibold-64">{selectedTodoData?.name || ''}</h1>
						<h2 className="text-gray-04 title-med-32">{selectedTodoData?.categoryName || ''}</h2>
					</header>
					<Timer
						selectedTodo={selectedTodo}
						onPlayToggle={handlePlayToggle}
						isPlaying={isPlaying}
						formattedTodayDate={formattedTodayDate}
						timerTime={timerTime}
						timerIncreasedTime={timerIncreasedTime}
						resetTimerIncreasedTime={resetTimerIncreasedTime}
						accumulatedTime={accumulatedTime}
						resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
						updateTargetTime={updateTargetTime}
					/>
					<Carousel />
				</div>

				<SideBarTimer
					targetTime={targetTime}
					ongoingTodos={ongoingTodos}
					completedTodos={completedTodos}
					isSideOpen={isSidebarOpen}
					toggleSidebar={handleSidebarToggle}
					onTodoSelection={handleTodoSelection}
					selectedTodo={selectedTodo}
					onPlayToggle={handlePlayToggle}
					isPlaying={isPlaying}
					formattedTodayDate={formattedTodayDate}
					resetTimerIncreasedTime={resetTimerIncreasedTime}
					timerIncreasedTime={timerIncreasedTime}
					resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
				/>
			</div>
		</div>
	);
};

export default TimerPage;
