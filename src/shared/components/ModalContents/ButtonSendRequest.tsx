import { ButtonHTMLAttributes, ReactNode } from 'react';

interface FriendRequestBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	disabled: boolean;
}

const ButtonSendRequest = ({ disabled = false, children, ...props }: FriendRequestBtnProps) => {
	const disabledBtn = 'bg-gray-bg-05 text-gray-04';

	const commonStyle =
		'flex items-center top-[1.2rem] right-[1.2rem] bottom-[1.2rem] absolute px-[2.2rem] py-[1.2rem] rounded-[5px] body-semibold-16';

	const styledBtn = disabled
		? disabledBtn
		: 'text-gray-bg-01 bg-mint-02 hover:bg-mint-02-hover active:bg-mint-02-press';

	return (
		<button className={`${styledBtn} ${commonStyle}`} {...props}>
			{children}
		</button>
	);
};

export default ButtonSendRequest;
