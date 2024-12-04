import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import GearIcon from '@/shared/assets/svgs/gear.svg?react';
import LogoIcon from '@/shared/assets/svgs/logo_icon.svg?react';
import MoribSetIcon from '@/shared/assets/svgs/moribSet.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import HomeSideBox from '@/components/atoms/HomeSideBox';
import SpaceLogoBtn from '@/components/atoms/SpaceLogoBtn';

import ButtonSVG from '../../../shared/components/ButtonSVG';
import { ModalContentsSetting } from './ModalContents';

const SideBarHome = () => {
	const modalRef = useRef<ModalWrapperRef>(null);
	const navigate = useNavigate();

	const openSettings = () => {
		modalRef.current?.open();
	};
	const navigateMoribSet = () => {
		navigate(ROUTES_CONFIG.moribSet.path);
	};
	return (
		<HomeSideBox>
			<div>
				<SpaceLogoBtn>
					<LogoIcon />
				</SpaceLogoBtn>
			</div>
			<div className="flex flex-col">
				<ButtonSVG onClick={navigateMoribSet}>
					<MoribSetIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</ButtonSVG>
				<ButtonSVG onClick={openSettings}>
					<GearIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</ButtonSVG>
			</div>

			<ModalWrapper ref={modalRef} backdrop={true}>
				<ModalContentsSetting />
			</ModalWrapper>
		</HomeSideBox>
	);
};

export default SideBarHome;
