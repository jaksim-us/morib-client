import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonAlertProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'danger';
	children: ReactNode;
}

const ButtonAlert = ({ children, variant = 'primary', ...props }: ButtonAlertProps) => {
	const primaryStyle = 'bg-gray-bg-06';
	const dangerStyle = 'bg-error-01';
	const buttonStyle = variant === 'primary' ? primaryStyle : dangerStyle;
	return (
		<button
			{...props}
			className={`subhead-semibold-18 w-full rounded-[5px] px-[4.8rem] py-[1rem] text-center text-white ${buttonStyle}`}
		>
			{children}
		</button>
	);
};

export default ButtonAlert;
