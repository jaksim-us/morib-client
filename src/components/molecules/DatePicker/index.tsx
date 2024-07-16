import { Dayjs } from 'dayjs';

import { useRef } from 'react';

import ArrowSVGBtn from '@/components/atoms/ArrowSVGBtn';
import DateBtn from '@/components/atoms/DateBtn';
import DropdownOptionsBtn from '@/components/atoms/DropdownOptionsBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import YearMonthTitle from '@/components/atoms/YearMonthTitle';

import useClickOutside from '@/hooks/useClickOutside';
import { useDatePicker } from '@/hooks/useDatePicker';

import { getHomeDropdownData } from '@/utils/date';

import { Direction } from '@/types/global';

import ButtonArrowIcon from '@/assets/svgs/btn_arrow.svg?react';
import BtnTodayIcon from '@/assets/svgs/btn_today.svg?react';

interface DatePickerProps {
	todayDate: Dayjs;
	selectedDate: Dayjs;
	onSelectedDateChange: (date: Dayjs) => void;
}

const DatePicker = ({ todayDate, selectedDate, onSelectedDateChange }: DatePickerProps) => {
	const {
		currentDate,
		weekDates,
		dropdownToggle,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
		handleYearMonthClick,
		handleDropdownToggle,
		handleDropdownClose,
	} = useDatePicker(todayDate);

	const homeDropdownData = getHomeDropdownData(todayDate);
	const dropdownRef = useRef<HTMLUListElement>(null);

	useClickOutside(dropdownRef, handleDropdownClose);

	return (
		<header className="mb-[2.8rem]">
			<section className="relative">
				<button type="button" className="flex items-center gap-[2rem]" onClick={handleDropdownToggle}>
					<YearMonthTitle selectedDate={currentDate} />
					<ButtonArrowIcon className={'rounded-full bg-gray-bg-03 hover:bg-gray-bg-05'} />
				</button>
				{dropdownToggle && (
					<ul
						ref={dropdownRef}
						className="absolute top-[5.4rem] max-h-[41.4rem] w-[22.5rem] flex-col overflow-scroll rounded-[5px] shadow-[0_3px_30px_0_rgba(0,0,0,0.40)]"
					>
						{homeDropdownData.map((item) => {
							return (
								<li
									key={item.format('YYYY년 MM월')}
									className="flex h-[4.6rem] w-full flex-row items-center justify-center border-none bg-mint-01"
								>
									<DropdownOptionsBtn onClick={() => handleYearMonthClick(item)}>
										{item.format('YYYY년 MM월')}
									</DropdownOptionsBtn>
								</li>
							);
						})}
					</ul>
				)}
			</section>

			<div className="flex items-center gap-[4.7rem]">
				<nav>
					<ul className="flex">
						{weekDates.map(({ date, day }) => {
							const isSelected = selectedDate.isSame(date, 'day');
							const formattedDate = date.format('DD');

							return (
								<li key={day}>
									<DateBtn
										isSelected={isSelected}
										onClick={() => onSelectedDateChange(date)}
									>{`${formattedDate} ${day}`}</DateBtn>
								</li>
							);
						})}
					</ul>
				</nav>
				<div className="flex gap-[1rem]">
					<ArrowSVGBtn direction={Direction.LEFT} onClick={handlePreviousWeek} />
					<SVGBtn onClick={handleToday}>
						<BtnTodayIcon className="rounded-[37px] bg-gray-bg-03 hover:bg-gray-bg-05" />
					</SVGBtn>
					<ArrowSVGBtn direction={Direction.RIGHT} onClick={handleNextWeek} />
				</div>
			</div>
		</header>
	);
};

export default DatePicker;
