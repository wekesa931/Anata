import styled from '@emotion/styled'

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`
const TitleText = styled.p`
  font-family: Rubik;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.36px;
  text-align: left;
  color: ${(props) => props.color};
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const ContentText = styled.p`
  font-family: Rubik;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.28px;
  text-align: left;
`

const CheckContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  margin-left: 5px;
  background-color: ${(props) => props.color};
`

const AuthLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`

const AuthButton = styled.button`
  padding: 5px;
  background: #ef6b6b;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`

const NoteTitle = styled.p`
  flex-grow: 0;
  font-family: Rubik;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.48px;
  text-align: center;
  color: #182c4c;
`

const FinishButton = styled.button`
  padding: 5px 6px;
  margin-top: 10px;
  background: #1084ee;
  border-radius: 5px;
  border: none;
  color: white;
  cursor: pointer;
`

const NoteText = styled.p`
  flex-grow: 0;
  font-family: Rubik;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.32px;
  text-align: center;
  color: #8b95a5;
`

export {
  TitleContainer,
  TitleText,
  Content,
  ContentText,
  CheckContainer,
  AuthLoader,
  AuthButton,
  Container,
  NoteText,
  NoteTitle,
  FinishButton,
}
