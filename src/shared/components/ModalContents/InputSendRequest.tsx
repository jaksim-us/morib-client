import React, { useRef, useState } from 'react';

import ButtonSVG from '@/shared/components/ButtonSVG';
import ButtonSendRequest from '@/shared/components/ModalContents/ButtonSendRequest';

import { emailRegex } from '@/shared/constants/emailRegex';

import InputClearButton from '@/shared/assets/svgs/btn_inputClear.svg?react';
import IconInputError from '@/shared/assets/svgs/error_input.svg?react';

const InputSendRequest = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [showClearBtn, setShowClearBtn] = useState(false);
	const [error, setError] = useState('');

	const handleInputChange = () => {
		if (inputRef.current) {
			setShowClearBtn(inputRef.current.value.length > 0);
			setError('');
		}
	};

	const handleClearBtn = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			setShowClearBtn(false);
			setError('');
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const email = inputRef.current ? inputRef.current.value : '';
		if (!emailRegex.test(email)) {
			setError(' 알맞은 형식의 이메일을 입력해주세요.');
			return;
		}
	};

	const errorStyle = 'border-error-01 border-[1px]';

	return (
		<form action="" onSubmit={handleSubmit}>
			<>
				<input
					type="text"
					placeholder="이메일을 입력해주세요."
					ref={inputRef}
					onChange={handleInputChange}
					className={`${error.length > 0 ? errorStyle : `border-[1px] border-gray-bg-02`} subhead-med-18 placeholder-text-gray-04 w-full rounded-[8px] bg-gray-bg-02 px-[2rem] py-[2rem] text-white focus:outline-none`}
				/>
				{error && (
					<div className="absolute mt-[1rem] flex gap-[5px]">
						<IconInputError />
						<p className="body-reg-16 text-error-01">{error}</p>
					</div>
				)}
			</>

			{showClearBtn && (
				<ButtonSVG className="absolute right-[18rem] top-[2rem]" type="button" onClick={handleClearBtn}>
					<InputClearButton />
				</ButtonSVG>
			)}

			<ButtonSendRequest type="submit" disabled={!inputRef.current?.value}>
				친구 요청 보내기
			</ButtonSendRequest>
		</form>
	);
};

export default InputSendRequest;
