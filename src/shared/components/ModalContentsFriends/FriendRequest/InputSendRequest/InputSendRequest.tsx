import React, { useRef, useState } from 'react';

import { emailRegex } from '@/shared/constants/emailRegex';

import InputClearButton from '@/shared/assets/svgs/btn_inputClear.svg?react';
import IconInputSuccess from '@/shared/assets/svgs/button_inputSuccess.svg?react';
import IconInputError from '@/shared/assets/svgs/error_input.svg?react';

import ButtonSendRequest from './ButtonSendRequest/ButtonSendRequest';

const InputSendRequest = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [showClearBtn, setShowClearBtn] = useState(false);
	const [alert, setAlert] = useState({ error: '', success: '' });

	const handleInputChange = () => {
		if (inputRef.current) {
			setShowClearBtn(inputRef.current.value.length > 0);

			setAlert((prev) => ({ ...prev, error: '' }));
		}
	};

	const handleClearBtn = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			setShowClearBtn(false);
			setAlert({ error: '', success: '' });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const email = inputRef.current ? inputRef.current.value : '';
		if (!emailRegex.test(email)) {
			setAlert((prev) => ({ ...prev, error: '알맞은 형식의 이메일을 입력해주세요.' }));
			return;
		} else {
			setAlert((prev) => ({ ...prev, success: '친구 요청에 성공했어요.' }));
		}
	};

	const errorStyle = 'border-error-01 border-[1px]';

	const successStyle = 'border-mint-01 border-[1px]';

	return (
		<form action="" onSubmit={handleSubmit}>
			<>
				<input
					type="text"
					placeholder="이메일을 입력해주세요."
					ref={inputRef}
					onChange={handleInputChange}
					className={`${alert.error.length > 0 ? errorStyle : alert.success.length > 0 ? successStyle : `border-[1px] border-gray-bg-02`} placeholder-text-gray-04 w-full rounded-[8px] bg-gray-bg-02 px-[2rem] py-[2rem] text-white subhead-med-18 focus:outline-none`}
				/>
				{alert.error && (
					<div className="absolute mt-[1rem] flex gap-[5px]">
						<IconInputError />
						<p className="text-error-01 body-reg-16">{alert.error}</p>
					</div>
				)}
				{alert.success && (
					<div className="absolute mt-[1rem] flex gap-[5px]">
						<IconInputSuccess />
						<p className="text-mint-01 body-reg-16">{alert.success}</p>
					</div>
				)}
			</>

			{showClearBtn && (
				<button className="absolute right-[18rem] top-[2rem]" type="button" onClick={handleClearBtn}>
					<InputClearButton />
				</button>
			)}

			<ButtonSendRequest type="submit" disabled={!inputRef.current?.value}>
				친구 요청 보내기
			</ButtonSendRequest>
		</form>
	);
};

export default InputSendRequest;
