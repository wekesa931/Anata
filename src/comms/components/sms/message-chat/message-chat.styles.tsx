import styled from '@emotion/styled'

const SenderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;
  margin: 8px 48px 32px 16px;
  padding: 8px;
  border-radius: 12px;
  background-color: #f9fafc;
`

const RecipientDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 4px;
  margin: 8px 15px 8px 49px;
  padding: 8px;
  border-radius: 12px;
  background-color: #fff5e5;
`

const GreyText = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 5px 0 0;
  font-family: Rubik;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.2px;
  text-align: left;
  color: #d1d5db;
`
const OrangeText = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 4px 0 142px;
  font-family: Rubik;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.2px;
  text-align: left;
  color: #ffcb80;
`
const DeliveredText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  flex-grow: 0;
  margin: 0 0 0 5px;
  padding: 4px 2.7px 4.7px 2.7px;
  transform: translate(143%);
}
`
const DeliveredTextRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  flex-grow: 0;
  margin: 0 0 0 5px;
  padding: 4px 2.7px 4.7px 2.7px;
}`

export {
  GreyText,
  RecipientDiv,
  SenderDiv,
  OrangeText,
  DeliveredText,
  DeliveredTextRight,
}
