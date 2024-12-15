import { AlertModalProps } from '@/pages/HomePage/components/ModalContents/Setting/ModalContentsAlert/ModalContentsAlert';
import ButtonAlert from '@/pages/HomePage/components/ModalContents/Setting/components/ButtonAlert';

const Complete = ({ handleClose }: AlertModalProps) => (
	<div className="flex flex-col rounded-[0.8rem] bg-gray-bg-04 p-[3rem]">
		<div className="w-[47.2rem]">
			<p className="subhead-bold-22 flex justify-center text-white">abc1234@gmail.com 계정이</p>
			<p className="subhead-bold-22 mb-[3rem] flex justify-center text-white"> 삭제되었습니다.</p>
			<ButtonAlert variant="primary" onClick={handleClose}>
				확인
			</ButtonAlert>
		</div>
	</div>
);

export default Complete;
