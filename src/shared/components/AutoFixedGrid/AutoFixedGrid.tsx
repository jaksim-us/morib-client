import { ReactNode } from 'react';

interface AutoFixedGridRootProps {
	fixed: 'left' | 'right';
	width: string;
	height?: string;
	children: ReactNode;
	className?: string;
}

const AutoFixedGridRoot = ({ fixed, width, height, children, className }: AutoFixedGridRootProps) => {
	// NOTE: fixed 값에 따라 왼쪽 혹은 오른쪽에 고정 요소 처리
	const gridStyle = fixed === 'left' ? `grid-cols-[${width},1fr]` : `grid-cols-[1fr,${width}]`;
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
