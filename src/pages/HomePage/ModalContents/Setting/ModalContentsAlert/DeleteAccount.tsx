import { FormEvent, useRef, useState } from 'react';

import IconWarning from '@/shared/assets/svgs/ic_delete_alert.svg?react';

import ButtonAlert from './ButtonAlert/ButtonAlert';
import { AlertModalProps } from './types/index';

const DeleteAccount = ({ handleClose, userEmail }: AlertModalProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState(false);
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (String(inputRef.current?.value) !== userEmail) {
			setError(true);
		}
	};

	const handleInputChange = () => {
		if (inputRef.current) {
			setError(false);
		}
	};
	return (
		<div className="flex flex-col rounded-[0.8rem] bg-gray-bg-04 p-[3rem]">
			<div className="w-[62rem]">
				<div className="mb-[3rem] flex justify-center">
					<IconWarning width="5.4rem" />
				</div>
				<p className="flex justify-center text-white subhead-bold-22">{userEmail} 계정이</p>
				<p className="mb-[3rem] flex justify-center text-white subhead-bold-22">
					영구적으로 삭제됩니다. 삭제하시겠습니까?
				</p>
				<p className="mb-[1rem] flex justify-center text-gray-05 subhead-med-18">이메일을 입력하여 확인해주세요.</p>
				<form action="" onSubmit={handleSubmit}>
					<input
						ref={inputRef}
						type="text"
						placeholder={userEmail}
						onChange={handleInputChange}
						className={`${error ? 'border-[1px] border-error-01' : ''} placeholder-text-gray-03 w-full rounded-[5px] bg-gray-bg-02 p-[1rem] text-white outline-none subhead-med-18`}
					/>
					{error && (
						<div className="absolute mt-[1rem]">
							<p className="mb-[3rem] text-error-01 body-reg-16">계속하려면 “{userEmail}”을(를) 입력하세요.</p>
						</div>
					)}
					<div className="mt-[5.7rem] flex gap-[1rem]">
						<ButtonAlert variant="danger" onClick={handleClose} type="submit">
							계정 영구 삭제
						</ButtonAlert>
						<ButtonAlert variant="primary" onClick={handleClose}>
							취소하기
						</ButtonAlert>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteAccount;
