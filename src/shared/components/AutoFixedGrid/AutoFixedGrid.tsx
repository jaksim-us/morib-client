import { ReactNode } from 'react';

interface AutoFixedGridRootProps {
	fixedSide: 'left' | 'right';
	fixedWidth: string;
	height?: string;
	children: ReactNode;
	className?: string;
}

const AutoFixedGridRoot = ({ fixedSide, fixedWidth, height, children, className }: AutoFixedGridRootProps) => {
	// NOTE: fixedSide 값에 따라 왼쪽 혹은 오른쪽에 고정 요소 처리
	const gridStyle = fixedSide === 'left' ? `grid-cols-[${fixedWidth},1fr]` : `grid-cols-[1fr,${fixedWidth}]`;
	const heightStyle = height ? height : 'h-screen';

	return <div className={`relative grid w-full ${heightStyle} ${gridStyle} ${className}`}>{children}</div>;
};

interface SlotProps {
	children: ReactNode;
	className?: string;
}

const Slot = ({ children, className }: SlotProps) => {
	return <div className={className}>{children}</div>;
};

export const AutoFixedGrid = Object.assign(AutoFixedGridRoot, { Slot });

export default AutoFixedGrid;
