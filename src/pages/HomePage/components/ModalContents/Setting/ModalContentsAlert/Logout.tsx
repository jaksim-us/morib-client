import { AlertModalProps } from '@/pages/HomePage/components/ModalContents/Setting/ModalContentsAlert/ModalContentsAlert';
import ButtonAlert from '@/pages/HomePage/components/ModalContents/Setting/components/ButtonAlert';

const Logout = ({ handleClose, userEmail }: AlertModalProps) => (
	<>
		<p className="subhead-bold-22 flex justify-center text-white">{userEmail} 계정이</p>
		<p className="subhead-bold-22 mb-[1rem] flex justify-center text-white">
			본 기기를 포함한 모든 기기에서 로그아웃됩니다.
		</p>
		<p className="subhead-med-18 mb-[3rem] flex justify-center text-gray-05">로그아웃 하시겠습니까?</p>
		<div className="flex gap-[1rem]">
			<ButtonAlert variant="danger" onClick={handleClose}>
				로그아웃
			</ButtonAlert>
			<ButtonAlert variant="primary" onClick={handleClose}>
				취소하기
			</ButtonAlert>
		</div>
	</>
);

export default Logout;
