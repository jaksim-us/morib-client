import CircleColorIcon from '@/shared/components/CircleColorIcon/CircleColorIcon';

import { colors } from '@/shared/constants/colorPallete';

interface ColorPaletteProps {
	isOpen: boolean;
	onSelectColor: (color: string) => void;
}

const ColorPalette = ({ isOpen, onSelectColor }: ColorPaletteProps) => {
	if (!isOpen) return null;

	return (
		<div className="absolute left-0 top-[50px] z-10 grid h-[11.6rem] w-[32rem] flex-shrink-0 grid-cols-6 gap-x-[2rem] gap-y-[1.2rem] rounded-[8px] bg-gray-bg-04 px-[2rem] py-[2.2rem]">
			{colors.map((color) => (
				<CircleColorIcon key={color} color={color} onClick={() => onSelectColor(color)} size={'h-[3rem] w-[3rem]'} />
			))}
		</div>
	);
};

export default ColorPalette;
