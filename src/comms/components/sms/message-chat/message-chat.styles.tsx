import styled from '@emotion/styled'

const MessagesContainer = styled.div`
  display: flex;
  margin: 8px;
  flex-direction: column;
  margin-bottom: 1px;
`

const MessagesWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SenderDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 4px;
  padding: 8px;
  width: 240px;
  border-radius: 12px;
  background-color: #f9fafc;
`

const TextMessage = styled.p`
  align-self: stretch;
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
`

const MessageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`

const RecipientDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
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

const TimeDevider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const BorderLine = styled.div`
  height: 0px;
  border-top: 1px solid #e8eaed;
  flex: 1;
`

const OrangeText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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

const SenderName = styled.div`
  width: 45%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Title = styled.p`
  font-weight: bold;
`

const Selector = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15;
  cursor: pointer;
  padding-right: 10px;
  padding-left: 10px;
`

const ChatContainer = styled.div`
  overflow-y: scroll;
  clear: both;
  padding-top: 68px;
  padding-bottom: 190px;
`

const DeliveryWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`
const DeliveredText = styled.div`
  top: 0;
  height: 16px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  padding: 4px 2.7px 4.7px 2.7px;
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
const Attachment = styled.div`
display: flex;
flex-direction: column;
align-content: center;
align-items: center;
max-width: '300px'
}`

const SentMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  flex-grow: 0;
  margin: 0 0 0 5px;
  padding: 4px 2.7px 4.7px 2.7px;
`

const StickyTop = styled.div`
  position: fixed;
  background: white;
  width: 325px;
  z-index: 1000;
`

const OptionsContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 25%;
  width: 195px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 12px;
  box-shadow: 0 2.8px 2.2px 0 rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px 0 rgba(0, 0, 0, 0.03), 0 12.5px 10px 0 rgba(0, 0, 0, 0.04),
    0 22.3px 17.9px 0 rgba(0, 0, 0, 0.04), 0 41.8px 33.4px 0 rgba(0, 0, 0, 0.05),
    0 100px 80px 0 rgba(0, 0, 0, 0.07);
  border: solid 1px #e8eaed;
`

const OptionsTitle = styled.div`
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 36px;
  background-color: #fff;
`

const OptionsTitleText = styled.p`
  font-family: Rubik;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.24px;
  text-align: left;
  color: #8b95a5;
`
const OptionsContent = styled.div`
  width: 100%;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  padding: 9px 36px;
  background-color: #fff;
  &:hover {
    background-color: #e8eaed;
  }
`
const Relative = styled.div`
  position: relative;
`

const OptionsContentText = styled.p`
  flex-grow: 0;
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.28px;
  text-align: left;
  color: #5d6b82;
`

export {
  GreyText,
  RecipientDiv,
  SenderDiv,
  OrangeText,
  DeliveredText,
  DeliveredTextRight,
  TextMessage,
  Attachment,
  MessageLoader,
  SenderName,
  DeliveryWrapper,
  SentMessage,
  TimeDevider,
  BorderLine,
  Selector,
  OptionsContainer,
  OptionsTitle,
  OptionsTitleText,
  OptionsContent,
  OptionsContentText,
  StickyTop,
  ChatContainer,
  Relative,
  Title,
  MessagesContainer,
  MessagesWrapper,
}
