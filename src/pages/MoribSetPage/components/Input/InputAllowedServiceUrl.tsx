import { FormEvent, useRef, useState } from 'react';

import ButtonSVG from '@/shared/components/Button/ButtonSVG/ButtonSVG';

import { isUrlValid } from '@/shared/utils/isUrlValid/index';

import InputClearButton from '@/shared/assets/svgs/btn_inputClear.svg?react';
import IconInputError from '@/shared/assets/svgs/error_input.svg?react';

import ButtonAddAllowedService from '@/pages/MoribSetPage/components/Button/ButtonAddAllowedService';

import { UrlInfo } from './../../types';

interface InputAllowedServiceUrlProps {
	urlList: UrlInfo[];
	addUrl: (url: string) => void;
}

const InputAllowedServiceUrl = ({ urlList, addUrl }: InputAllowedServiceUrlProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [showClearBtn, setShowClearBtn] = useState(false);
	const [errorMessage, setErrorMessage] = useState({ error: '' });

	const handleInputChange = () => {
		if (inputRef.current) {
			setShowClearBtn(inputRef.current.value.length > 0);
			setErrorMessage({ error: '' });
		}
	};

	const handleClearBtn = () => {
		if (inputRef.current) {
			inputRef.current.value = '';
			setShowClearBtn(false);
			setErrorMessage({ error: '' });
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const url = inputRef.current ? inputRef.current.value : '';
		if (!isUrlValid(url)) {
			setErrorMessage({ error: '알맞은 형식의 주소를 입력해주세요.' });
			return;
		}
		if (Array.isArray(urlList) && urlList.some((item) => item.url === url)) {
			setErrorMessage({ error: '이미 존재하는 주소입니다.' });
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
		<form onSubmit={handleSubmit}>
			<div className="flex items-center">
				<input
					type="text"
					placeholder="허용할 웹사이트 주소를 입력해 주세요."
					ref={inputRef}
					onChange={handleInputChange}
					className={`${errorMessage.error.length > 0 ? errorStyle : `border-[1px] border-gray-bg-02`} subhead-med-18 placeholder-text-gray-04 w-full rounded-[8px] bg-gray-bg-02 px-[2rem] py-[2rem] text-white focus:outline-none`}
				/>
				{showClearBtn && (
					<ButtonSVG className="absolute right-[21.1rem] top-[2rem]" type="button" onClick={handleClearBtn}>
						<InputClearButton />
					</ButtonSVG>
				)}
				<ButtonAddAllowedService type="submit" disabled={!inputRef.current?.value || errorMessage.error.length > 0} />
			</div>

			{errorMessage.error && (
				<div className="absolute mt-[1rem] flex gap-[0.5rem]">
					<IconInputError />
					<p className="body-reg-16 text-error-01">{errorMessage.error}</p>
				</div>
			)}
		</form>
	);
};

export default InputAllowedServiceUrl;
