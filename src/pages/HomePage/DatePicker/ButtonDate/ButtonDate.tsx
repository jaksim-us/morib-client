import { ButtonHTMLAttributes, ReactNode } from 'react';

interface DateBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isSelected: boolean;
	children: ReactNode;
}

const ButtonDate = ({ isSelected, children, ...props }: DateBtnProps) => {
	const commonBtnStyle = 'flex w-full h-[7.6rem] items-center justify-center text-white ';
	const textStyle = isSelected ? 'head-bold-24' : 'subhead-reg-22';
	const borderStyle = isSelected ? 'border-b-[0.3rem] border-mint-01' : 'border-b-[0.2rem] border-gray-02';

	const groupHoverBorderStyle = isSelected ? '' : 'group-hover:border-b-[0.3rem] group-hover:border-gray-03';

	return (
		<div className="group">
			<button type="button" className={`${commonBtnStyle} ${textStyle}`} {...props}>
				{children}
			</button>
			<hr className={`${borderStyle} ${groupHoverBorderStyle}`} />
		</div>
	);
};

export default ButtonDate;
