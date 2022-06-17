import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../store/rootReducer';
import { MODAL_KEY_MAP } from '../../store/constants';
import { closeModal } from '../../store/modals/action';
import Modal from '../modal/Modal';
import CreateNewQuestion from './createNewQuestion';

function createNewQuestionModal() {
  const dispatch = useDispatch<any>();
  const modalState = useSelector(
    ({ modals }: RootState) => modals[MODAL_KEY_MAP.CREATE_NEW_QUESTION],
  );

  function hideModal() {
    dispatch(closeModal(MODAL_KEY_MAP.CREATE_NEW_QUESTION));
  }

  return (
    <Modal show={modalState?.visible} handleClose={hideModal}>
      {modalState?.visible && (
        <CreateNewQuestion
          onClose={hideModal}
        />
      )}
    </Modal>
  );
}

export default createNewQuestionModal;
