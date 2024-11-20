import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const ButtonAddFriend = ({ children, ...props }: ButtonProps) => {
	return (
		<>
			<button
				{...props}
				className="subhead-bold-20 flex flex-shrink-0 items-center justify-center rounded-[0.8rem] bg-main-gra-01 px-[6.2rem] py-[2rem] text-gray-01 hover:bg-main-gra-hover active:bg-main-gra-press"
			>
				{children}
			</button>
		</>
	);
};

export default ButtonAddFriend;
