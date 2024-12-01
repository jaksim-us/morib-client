import { useRef } from 'react';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import { FolderIcon, GearIcon, LogoIcon } from './assets/svgs';
import { ModalContentsSetting } from './components/ModalContents';

const Sidebar = () => {
	const modalRef = useRef<ModalWrapperRef>(null);
	const openSettings = () => {
		modalRef.current?.open();
	};

	return (
		<>
			<aside className="sticky top-0 flex min-h-screen w-[7.4rem] flex-shrink-0 flex-col items-center justify-between bg-gray-bg-02 pb-[2.1rem] pt-[5.4rem]">
				<button type="button" className="relative flex w-full items-center gap-[0.8rem]">
					<hr className="h-[54px] w-[2px] rounded-r-[8px] bg-white" />
					<LogoIcon />
				</button>

				<section className="flex flex-col items-center justify-center">
					<button>
						<FolderIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
					</button>

					<button onClick={openSettings}>
						<GearIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
					</button>
				</section>
			</aside>
			<ModalWrapper ref={modalRef} backdrop={true}>
				<ModalContentsSetting />
			</ModalWrapper>
		</>
	);
};

export default Sidebar;
