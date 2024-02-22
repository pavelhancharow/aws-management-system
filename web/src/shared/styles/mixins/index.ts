import styled from 'styled-components';

export const FlexBoxContainer = styled.div`
  display: flex;
`

export const FlexCenterContainer = styled(FlexBoxContainer)`
  align-items: center;
`

export const FlexBoxCenterContainer  = styled(FlexCenterContainer)`
  justify-content: center;
`

export const FlexColumnContainer = styled(FlexBoxContainer)`
  flex-direction: column;
`