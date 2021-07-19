import styled from '@emotion/styled'

const Input = styled.textarea`
  min-height: 20px;
  width: 100%;
  flex-grow: 0;
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.28px;
  text-align: left;
  color: #182c4c;
  rows: 12;
  resize: none;
  border: none;
  outline: none;
`

const SendButton = styled.button`
  width: 66px;
  height: 31px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 12px;
  background-color: #87c1f7;
  &:disabled {
    cursor: not-allowed;
  }
  border: none;
  color: white;
  margin-bottom: 16px;
`
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  margin: 56px 0 0;
  padding: 16px;
  background-color: #ffffff;
`

const InputSpan = styled.span`
  width: 33px;
  height: 18px;
  flex-grow: 0;
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.28px;
  text-align: left;
  color: #8b95a5;
`
const InputOption = styled.div`
  width: 83px;
  height: 18px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  padding: 0;
`

export { Input, SendButton, InputArea, InputSpan, InputOption }
