import { useRef } from 'react';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import GearIcon from '@/shared/assets/svgs/gear.svg?react';
import LogoIcon from '@/shared/assets/svgs/logo_icon.svg?react';

import HomeSideBox from '@/components/atoms/HomeSideBox';
import SpaceLogoBtn from '@/components/atoms/SpaceLogoBtn';

import ButtonSVG from '../../../shared/components/ButtonSVG';
import ModalContentSetting from './modalContent/ModalContentSetting';

const SideBarHome = () => {
	const modalRef = useRef<ModalWrapperRef>(null);
	const openSettings = () => {
		modalRef.current?.open();
	};
	return (
		<HomeSideBox>
			<div>
				<SpaceLogoBtn>
					<LogoIcon />
				</SpaceLogoBtn>
			</div>
			<div>
				<ButtonSVG onClick={openSettings}>
					<GearIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</ButtonSVG>
			</div>

			<ModalWrapper ref={modalRef} backdrop={true}>
				<ModalContentSetting />
			</ModalWrapper>
		</HomeSideBox>
	);
};

export default SideBarHome;
