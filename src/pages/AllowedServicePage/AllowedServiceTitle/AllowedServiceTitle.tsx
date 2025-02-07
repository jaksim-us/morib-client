import { ButtonHTMLAttributes, InputHTMLAttributes, MouseEvent, ReactNode, useRef, useState } from 'react';

import ButtonArrowSVG from '@/shared/components/ButtonArrowSVG/ButtonArrowSVG';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { Direction } from '@/shared/types/global';

import { COLOR_PALETTE_MAP } from '@/shared/constants/colorPallete';

import ColorPalette from '../BoxMakeAllowedService/ColorPallete/ColorPallete';

interface AllowedServiceTitleRootProps {
	children: ReactNode;
}

const AllowedServiceTitleRoot = ({ children }: AllowedServiceTitleRootProps) => {
	return <Spacer.Width className="mt-[6.8rem] flex items-center gap-[1.4rem]">{children}</Spacer.Width>;
};

const AllowedServiceTitleInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			className={`placeholder-text-gray-03 w-full bg-transparent text-white title-bold-32 focus:outline-none ${props.className}`}
			{...props}
		/>
	);
};

interface AllowedServiceTitleColorButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	color: string;
}

const AllowedServiceTitleColorButton = ({ color, ...props }: AllowedServiceTitleColorButtonProps) => {
	const [isPaletteOpen, setIsPaletteOpen] = useState(false);
	const paletteRef = useRef<HTMLSpanElement>(null);

	const handleTogglePalette = () => {
		setIsPaletteOpen((prev) => !prev);
	};

	const handleClosePalette = () => {
		setIsPaletteOpen(false);
	};

	useClickOutside(paletteRef, handleClosePalette);

	return (
		<div className="relative flex items-center gap-[0.4rem]">
			<div className={`h-[3rem] w-[3rem] rounded-full ${color}`} />
			<span ref={paletteRef}>
				<ButtonArrowSVG
					onClick={handleTogglePalette}
					direction={isPaletteOpen ? Direction.UP : Direction.DOWN}
					bg={false}
					{...props}
				/>
				<ColorPalette isOpen={isPaletteOpen}>
					{Object.keys(COLOR_PALETTE_MAP).map((hashColor) => {
						return <ColorPalette.ColorButton key={hashColor} hashColor={hashColor as keyof typeof COLOR_PALETTE_MAP} />;
					})}
				</ColorPalette>
			</span>
		</div>
	);
};

const AllowedServiceTitle = Object.assign(AllowedServiceTitleRoot, {
	ColorButton: AllowedServiceTitleColorButton,
	Input: AllowedServiceTitleInput,
});

export default AllowedServiceTitle;
