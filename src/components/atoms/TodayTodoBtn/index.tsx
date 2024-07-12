import { ButtonHTMLAttributes } from 'react';

interface TodayTodoBtn extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant: '추가' | '시작';
}

const btnVariant = {
	추가: { styles: 'px-[4rem] py-[1.4rem] ', text: '오늘 할 일 추가' },
	시작: { styles: 'px-[6.2rem] py-[2rem] ', text: '타이머 시작하기' },
};

const TodayTodoBtn = ({ variant = '시작', disabled = true, ...props }: TodayTodoBtn) => {
	const defaultStyle = 'subhead-bold-20 flex items-center justify-center rounded-[0.8rem] ';
	const buttonStyle = disabled ? 'bg-gray-bg-05 text-gray-04 ' : 'bg-main-gra-01 text-gray-01 ';

	return (
		<button className={defaultStyle + btnVariant[variant].styles + buttonStyle} disabled={disabled} {...props}>
			{btnVariant[variant].text}
		</button>
	);
};

export default TodayTodoBtn;
