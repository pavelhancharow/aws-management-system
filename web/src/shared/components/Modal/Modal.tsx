import React, { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg';
import { ModalImgTypes } from '../../enums';
import {
  ModalContainer,
  ModalCard,
  ModalTitle,
  ModalCloseButton,
  ModalCardImgSide,
  ModalCardContentSide, ModalCardWrapper,
} from './styles';

const modalRoot = document.getElementById('modal-root') as HTMLElement;
const bodyElement = document.body as HTMLElement;

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  image?: ModalImgTypes | null;
}

const Modal = ({ isOpen = false, title, onClose, children, image = null }: IModal) => {
  useEffect(() => {
    if(isOpen){
      bodyElement.style.overflow = 'hidden';
    }

    return () => {
      bodyElement.removeAttribute('style');
    };
  }, [isOpen])

  if (!isOpen) return null;

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onClose();
  };

  const content = (
    <ModalContainer onClick={handleClose}>
      <ModalCard onClick={(event) => event.stopPropagation()}>
        <ModalCloseButton onClick={handleClose}>
          <CloseIcon />
        </ModalCloseButton>

        <ModalTitle>{title}</ModalTitle>

        <ModalCardWrapper is-image={image}>
          <ModalCardImgSide type={image} />

          <ModalCardContentSide is-image={image}>
            {children}
          </ModalCardContentSide>
        </ModalCardWrapper>
      </ModalCard>
    </ModalContainer>
  );

  return createPortal(content, modalRoot);
}

export default Modal;