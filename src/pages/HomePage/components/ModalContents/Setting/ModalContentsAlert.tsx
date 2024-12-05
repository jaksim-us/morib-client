import { FormEvent, useRef, useState } from 'react';

import IconWarning from '@/shared/assets/svgs/ic_delete_alert.svg?react';

import ButtonAlert from '@/pages/HomePage/components/ModalContents/Setting/components/ButtonAlert';

interface AlertsProps {
	variant?: 'logout' | 'delete-account' | 'delete-account-complete';
	handleClose?: () => void;
}

const ModalContentsAlerts = ({ variant, handleClose }: AlertsProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState(false);
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (String(inputRef.current?.value) !== 'abc1234@gmail.com') {
			setError(true);
		}
	};

	const handleInputChange = () => {
		if (inputRef.current) {
			setError(false);
		}
	};
	const errorStyle = 'border-error-01 border-[1px]';

	const renderLogoutModal = () => (
		<>
			<p className="subhead-bold-22 flex justify-center text-white">abc1234@gmail.com 계정이</p>
			<p className="subhead-bold-22 mb-[1rem] flex justify-center text-white">
				본 기기를 포함한 모든 기기에서 로그아웃됩니다.
			</p>
			<p className="subhead-med-18 mb-[3rem] flex justify-center text-gray-05">로그아웃 하시겠습니까?</p>
			<div className="flex gap-[1rem]">
				<ButtonAlert variant="danger" onClick={handleClose}>
					로그아웃
				</ButtonAlert>
				<ButtonAlert variant="primary" onClick={handleClose}>
					취소하기
				</ButtonAlert>
			</div>
		</>
	);

	const renderDeleteAccountModal = () => (
		<div className="w-[62rem]">
			<div className="mb-[3rem] flex justify-center">
				<IconWarning width="5.4rem" />
			</div>
			<p className="subhead-bold-22 flex justify-center text-white">abc1234@gmail.com 계정이</p>
			<p className="subhead-bold-22 mb-[3rem] flex justify-center text-white">
				영구적으로 삭제됩니다. 삭제하시겠습니까?
			</p>
			<p className="subhead-med-18 mb-[1rem] flex justify-center text-gray-05">이메일을 입력하여 확인해주세요.</p>
			<form action="" onSubmit={handleSubmit}>
				<input
					ref={inputRef}
					type="text"
					placeholder="abc1234@gmail.com"
					onChange={handleInputChange}
					className={`${error ? errorStyle : ''} subhead-med-18 placeholder-text-gray-03 w-full rounded-[5px] bg-gray-bg-02 p-[1rem] text-white outline-none`}
				/>
				{error && (
					<div className="mt-[1rem]">
						<p className="body-reg-16 mb-[3rem] text-error-01">계속하려면 “yuri_2024@gmail.com”을(를) 입력하세요.</p>
					</div>
				)}
				<div className="mt-[3rem] flex gap-[1rem]">
					<ButtonAlert variant="danger" onClick={handleClose} type="submit">
						계정 영구 삭제
					</ButtonAlert>
					<ButtonAlert variant="primary" onClick={handleClose}>
						취소하기
					</ButtonAlert>
				</div>
			</form>
		</div>
	);

	const renderDeleteAccountCompleteModal = () => (
		<div className="w-[47.2rem]">
			<p className="subhead-bold-22 flex justify-center text-white">abc1234@gmail.com 계정이</p>
			<p className="subhead-bold-22 mb-[3rem] flex justify-center text-white"> 삭제되었습니다.</p>
			<ButtonAlert variant="primary" onClick={handleClose}>
				확인
			</ButtonAlert>
		</div>
	);

	return (
		<div className="flex flex-col rounded-[0.8rem] bg-gray-bg-04 p-[3rem]">
			{variant === 'logout' && renderLogoutModal()}
			{variant === 'delete-account' && renderDeleteAccountModal()}
			{variant === 'delete-account-complete' && renderDeleteAccountCompleteModal()}
		</div>
	);
};

export default ModalContentsAlerts;
