import { colors } from '@/shared/constants/colorPallete';

interface ColorPaletteProps {
	isOpen: boolean;
	onSelectColor: (color: string) => void;
}

const ColorPalette = ({ isOpen, onSelectColor }: ColorPaletteProps) => {
	if (!isOpen) return null;

	return (
		<div className="absolute left-0 top-[50px] z-10 grid h-[11.6rem] w-[32rem] flex-shrink-0 grid-cols-6 gap-x-[20px] gap-y-[12px] rounded-[8px] bg-gray-bg-04 px-[2rem] py-[2.2rem]">
			{colors.map((color) => (
				<button
					key={color}
					onClick={() => onSelectColor(color)}
					className="h-[3rem] w-[3rem] flex-shrink-0 rounded-[31px]"
					style={{ backgroundColor: color }}
				/>
			))}
		</div>
	);
};

export default ColorPalette;
