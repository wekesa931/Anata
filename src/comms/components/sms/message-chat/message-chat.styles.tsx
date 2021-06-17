import styled from '@emotion/styled'

const SenderDiv = styled.div`
  background: #ebeff3;
  border: 1px solid #c6dfeb;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px;
  margin-right: auto;
  margin-left: 8px;
  font-family: 'Karla';
  flex: 1;
`

const RecipientDiv = styled.div`
  background: #ffffff;
  border: 1px solid #ff9800;
  box-sizing: border-box;
  border-radius: 8px;
  margin-left: auto;
  margin-right: 8px;
  padding: 8px;
  flex: 1;
`

const GreyText = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  margin-right: 8px;
  color: #cccccc;
  text-transform: uppercase;
`

export { GreyText, RecipientDiv, SenderDiv }
