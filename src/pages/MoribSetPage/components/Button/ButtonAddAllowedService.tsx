const ButtonAddAllowedService = ({ disabled = false, ...props }) => {
	const defaultStyle =
		'absolute  right-[1.2rem] body-semibold-16 flex items-center justify-center rounded-[5px] py-[1.2rem] px-[2.2rem]';
	const buttonStyle = disabled
		? ' bg-gray-bg-05 text-gray-04'
		: ' bg-main-gra-01 text-gray-01 active:bg-main-gra-press';

	return (
		<button className={defaultStyle + buttonStyle} disabled={disabled} {...props}>
			모립세트 등록하기
		</button>
	);
};

export default ButtonAddAllowedService;
