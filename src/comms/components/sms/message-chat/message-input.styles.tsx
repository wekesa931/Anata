import styled from '@emotion/styled'

const InputContainer = styled.div`
  background: #ffffff;
  border-top: 1px solid #c6dfeb;
  box-sizing: border-box;
  display: flex;
  width: 100%;
`

const Input = styled.textarea`
  height: 100%;
  margin-left: 5%;
  margin-right: 5%;
  border: none;
  outline: none;
  background: none;
  flex: 1;
  padding: 8px;
  rows: 12;
  resize: none;
`

const SendButton = styled.button`
  border: none;
  background: #ffffff;
  margin-right: 5%;
  margin-top: auto;
  margin-bottom: auto;
  cursor: pointer;
  transition: background 0.3s linear;
  &:disabled {
    cursor: not-allowed;
  }
`

export { InputContainer, Input, SendButton }
