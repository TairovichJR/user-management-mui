import { Modal, styled } from '@mui/material';
import UserForm from './UserForm';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px'
});

interface EditModalProps {
  modal: boolean;
  setModal: (value: boolean) => void;
  userId: number;
}

const ModalEdit = ({ modal, setModal, userId }: EditModalProps) => {

  return (
    <StyledModal
      open={modal}
      onClose={e => setModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <UserForm formType='quickEdit' userId={userId}  onCloseModal={() => setModal(false)}/>
    </StyledModal>
  );
}

export default ModalEdit;
