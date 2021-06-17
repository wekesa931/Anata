import styled from '@emotion/styled'

const TopBarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(96, 142, 182, 0.2);
  height: 48px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: sticky;
  top: 0;
  clear: both;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`

const IconButton = styled.button`
  background-color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s linear;
  border-radius: 8px;
  padding: 4px;
  &:hover {
    background-color: #ffeccf;
  }
`
export { Header, IconButton, TopBarWrapper }
