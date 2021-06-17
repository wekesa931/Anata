import styled from '@emotion/styled'

const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: #fafafa;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0px 8px 16px 0px rgba(96, 142, 182, 0.1);
  position: sticky;
`

const TabElement = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  align-items: center;
  height: 36px;
  curser: pointer;
`

export { TabsContainer, TabElement }
