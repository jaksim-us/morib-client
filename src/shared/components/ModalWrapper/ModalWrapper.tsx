import { MouseEvent, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import './styles/dialog.css';

interface ModalWrapperProps {
	children: ReactNode;
	backdrop?: boolean;
}

export interface ModalWrapperRef {
	open: () => void;
	close: () => void;
}

const ModalWrapper = forwardRef<ModalWrapperRef, ModalWrapperProps>(function Modal(
	{ children, backdrop = false },
	ref,
) {
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current?.showModal();
		},
		close() {
			dialog.current?.close();
		},
	}));
	const modalElement = document.getElementById('modal');

	const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialog.current) {
			dialog.current?.close();
		}
	};

	if (!modalElement) {
		return null;
	}

	return createPortal(
		<dialog
			ref={dialog}
			onClick={handleClick}
			className={`custom-dialog bg-transparent ${backdrop ? 'with-backdrop' : ''}`}
		>
			{children}
		</dialog>,
		modalElement,
	);
});

export default ModalWrapper;
