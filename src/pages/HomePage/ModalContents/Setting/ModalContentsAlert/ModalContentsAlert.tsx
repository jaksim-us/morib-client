import Complete from '@/pages/HomePage/components/ModalContents/Setting/ModalContentsAlert/Complete';
import DeleteAccount from '@/pages/HomePage/components/ModalContents/Setting/ModalContentsAlert/DeleteAccount';
import Logout from '@/pages/HomePage/components/ModalContents/Setting/ModalContentsAlert/Logout';

export interface AlertModalProps {
	handleClose?: () => void;
	userEmail?: string;
}

const ModalContentsAlert = {
	Logout: Logout,
	DeleteAccount: DeleteAccount,
	Complete: Complete,
};

export default ModalContentsAlert;
