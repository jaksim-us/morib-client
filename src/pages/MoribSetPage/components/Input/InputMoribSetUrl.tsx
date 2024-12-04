import React, { useRef, useState } from 'react';

import ButtonSVG from '@/shared/components/ButtonSVG';

import { urlRegex } from '@/shared/constants/urlRegex';

import InputClearButton from '@/shared/assets/svgs/btn_inputClear.svg?react';
import IconInputError from '@/shared/assets/svgs/error_input.svg?react';

import ButtonAddMoribSet from '@/pages/MoribSetPage/components/Button/ButtonAddMoribSet';

interface InputMoribSetUrlProps {
	addUrl: (url: string) => void;
}

const InputMoribSetUrl = ({ addUrl }: InputMoribSetUrlProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [showClearBtn, setShowClearBtn] = useState(false);
	const [alert, setAlert] = useState({ error: '' });

	const handleInputChange = () => {
		if (inputRef.current) {
			setShowClearBtn(inputRef.current.value.length > 0);
			setAlert({ error: '' });
		}
	};

	const handleClearBtn = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			setShowClearBtn(false);
			setAlert({ error: '' });
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const url = inputRef.current ? inputRef.current.value : '';
		if (!urlRegex.test(url)) {
			setAlert({ error: '알맞은 형식의 주소를 입력해주세요.' });
			return;
		}
		addUrl(url);
		if (inputRef.current) {
			inputRef.current.value = '';
			setShowClearBtn(false);
		}
	};

	const errorStyle = 'border-error-02 border-[1px]';

	return (
		<form action="" onSubmit={handleSubmit}>
			<div className="flex items-center">
				<input
					type="text"
					placeholder="허용할 웹사이트 주소를 입력해 주세요."
					ref={inputRef}
					onChange={handleInputChange}
					className={`${alert.error.length > 0 ? errorStyle : `border-[1px] border-gray-bg-02`} subhead-med-18 placeholder-text-gray-04 w-full rounded-[8px] bg-gray-bg-02 px-[2rem] py-[2rem] text-white focus:outline-none`}
				/>
				{showClearBtn && (
					<ButtonSVG className="absolute right-[21.1rem] top-[2rem]" type="button" onClick={handleClearBtn}>
						<InputClearButton />
					</ButtonSVG>
				)}
				<ButtonAddMoribSet type="submit" disabled={!inputRef.current?.value || alert.error.length > 0} />
			</div>

			{alert.error && (
				<div className="absolute mt-[1rem] flex gap-[5px]">
					<IconInputError />
					<p className="body-reg-16 text-error-01">{alert.error}</p>
				</div>
			)}
		</form>
	);
};

export default InputMoribSetUrl;
