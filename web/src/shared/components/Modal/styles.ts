import styled, { css, keyframes } from 'styled-components';
import { globalColors } from '../../../styles';
import { ModalImgTypes } from '../../enums';
import { convertHexToRgb } from '../../helpers';
import { FlexBoxCenterContainer, FlexColumnContainer, H3 } from '../../styles';
import RegisterPNG from '../../assets/images/create-account.png';
import UploadFilePNG from '../../assets/images/upload-file.png';
import UpdateFilePNG from '../../assets/images/update-file.png';

const modalBGColor = convertHexToRgb(globalColors.darkBlueGray, 0.7)

const ModalImgData = {
  [ModalImgTypes.Register]: RegisterPNG,
  [ModalImgTypes.UploadFile]: UploadFilePNG,
  [ModalImgTypes.UpdateFile]: UpdateFilePNG,
} as {[key in ModalImgTypes]: string}

const fadeInTop = keyframes`
  0% { top: -300px; opacity: 0 }
  100% { top: 0; opacity: 1; }
`;

export const ModalContainer = styled(FlexBoxCenterContainer)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  
  background-color: ${modalBGColor};
  overflow-y: auto;
`;

export const ModalCard = styled(FlexColumnContainer)`  
  background-color: var(--white);
  border-radius: 10px;
  width: 100%;
  max-width: 780px;
  position: relative;
  overflow-y: visible;
  padding: 30px 40px;
  box-shadow: 0 7px 25px 1px rgba(0,0,0,0.75);
  transition: all 0.3s;
  animation: ${fadeInTop} 0.3s linear;
`;

export const ModalCardWrapper = styled.div<{ ['is-image']: ModalImgTypes | null }>`
  ${(props) => props['is-image'] && css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  `}
`;

export const ModalCardImgSide = styled.div<{ type: ModalImgTypes | null }>`
  ${(props) => props.type && css`
    display: flex;
    width: 50%;
    height: 300px;

    background-image: url(${ModalImgData[props.type]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

export const ModalCardContentSide = styled.div<{ ['is-image']: ModalImgTypes | null }>`
  ${(props) => props['is-image'] && css`
    display: flex;
    width: 50%;
    flex-direction: column;
  `}
  max-height: 500px;
  overflow: auto;
  scrollbar-color: var(--smokyWhiteDark) var(--smokyWhiteDark);
  scrollbar-width: thin;
`;

export const ModalTitle = styled(H3)`
  margin-bottom: 25px;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
`;