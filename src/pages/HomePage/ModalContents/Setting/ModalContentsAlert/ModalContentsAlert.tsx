import Complete from './Complete';
import DeleteAccount from './DeleteAccount';
import Logout from './Logout';

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
