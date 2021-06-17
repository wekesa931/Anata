import styled from '@emotion/styled'

const Button = styled.button`
  display: flex;
  align-items: flex-start;
  outline: none;
  background: none;
  border: none;
  border-bottom: 0.5px solid whitesmoke;
  text-align: initial;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #ffeccf;
  }
`

const MessageTitle = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 8px 0;
`

const MessageText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 14px;
  flex: 1;
`

const MessageDate = styled.p`
  font-size: 14px;
  font-weight: bold;
`

export { Button, MessageTitle, MessageText, MessageDate }
