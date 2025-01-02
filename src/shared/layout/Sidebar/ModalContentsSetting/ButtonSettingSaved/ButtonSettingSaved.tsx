const ButtonSettingSaved = ({ disabled = false, ...props }) => {
	const defaultStyle =
		'subhead-semibold-20 flex items-center justify-center rounded-[0.8rem] w-[19rem] h-[5.2rem] px-[4rem] py-[1.4rem]';
	const buttonStyle = disabled ? ' bg-mint-02 text-gray-01 active:bg-main-gra-press' : ' bg-gray-bg-06 text-gray-05';
	return (
		<button className={defaultStyle + buttonStyle} disabled={disabled} {...props}>
			변경사항 저장
		</button>
	);
};

export default ButtonSettingSaved;
