import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useEffect, useMemo, useState } from 'react';

import { useSelectedTodo } from '@/shared/hooks/useSelectedTodo';
import useTimerCount from '@/shared/hooks/useTimerCount';
import useToggleSidebar from '@/shared/hooks/useToggleSideBar';
import useUrlHandler from '@/shared/hooks/useUrlHandler';

import { useGetMoribSet, useGetTodoList, usePostTimerStop } from '@/shared/apis/timer/queries';

import { splitTasksByCompletion } from '@/shared/utils/timer';
import { getBaseUrl } from '@/shared/utils/url';

import { DATE_FORMAT, DEFAULT_URL, TIMEZONE } from '@/shared/constants/timerPageText';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';
import HomeIcon from '@/shared/assets/svgs/btn_home.svg?react';

import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import Carousel from './components/Carousel';
import MoribSetContainer from './components/MoribSetContainer';
import MoribSetTitle from './components/MoribSetTitle';
import SideBarTimer from './components/SideBarTimer';
import Timer from './components/Timer';

dayjs.extend(utc);
dayjs.extend(timezone);

interface MoribSetData {
	url: string;
}

interface Todo {
	id: number;
	name: string;
	targetTime: number;
	categoryName: string;
}

const TimerPage = () => {
	const { mutate: stopTimer } = usePostTimerStop();
	const { isSidebarOpen, handleSidebarToggle } = useToggleSidebar();
	const todayDate = dayjs().tz(TIMEZONE);
	const formattedTodayDate = todayDate.format(DATE_FORMAT);

	const { data: todosData, isLoading, error } = useGetTodoList(formattedTodayDate);
	const { task: todos = [], totalTimeOfToday = 0 } = todosData?.data || {};
	const { ongoingTodos, completedTodos } = splitTasksByCompletion(todos);

	const [selectedTodo, setSelectedTodo] = useSelectedTodo(todos);

	const [targetTime, setTargetTime] = useState(0);

	const [isPlaying, setIsPlaying] = useState(false);

	const [isMoribSetVisible, setIsMoribSetVisible] = useState(false);

	const selectedTodoData = todos.find((todo: Todo) => todo.id === selectedTodo);

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
		setIsMoribSetVisible(true);
	};

	const handleCancelClick = () => {
		setIsMoribSetVisible(false);
	};

	const updateTargetTime = (newTime: number) => {
		setTargetTime(newTime);
	};

	if (isLoading || error) {
		return <div>{isLoading ? 'Loading...' : 'Error...'}</div>;
	}

	return (
		<TimerPageTemplates>
			<div className="flex flex-col">
				<div className="relative flex w-screen justify-between">
					<MoribSetTitle onClick={handleMoribSetTitleClick} />
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
				{isMoribSetVisible && (
					<div className="pointer-events-none absolute inset-0 top-[10rem] z-10 flex">
						<div className="pointer-events-auto">
							<MoribSetContainer onCancel={handleCancelClick} />
						</div>
					</div>
				)}

				<div
					className={`mt-[-0.8rem] flex w-screen min-w-[1080px] flex-col items-center justify-center transition-[padding-right] duration-300 ${isSidebarOpen ? 'pr-0 2xl:pr-[40.2rem]' : 'pr-0'}`}
				>
					<header className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
						<h1 className="title-semibold-64 text-white">{selectedTodoData?.name || ''}</h1>
						<h2 className="title-med-32 text-gray-04">{selectedTodoData?.categoryName || ''}</h2>
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
		</TimerPageTemplates>
	);
};

export default TimerPage;
