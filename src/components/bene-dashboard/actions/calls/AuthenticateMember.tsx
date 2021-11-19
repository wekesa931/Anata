/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react'
import { Check, CheckCircle, Slash, X } from 'react-feather'
import { useMutation, useQuery } from '@apollo/client'

import {
  AuthLoader,
  CheckContainer,
  Content,
  ContentText,
  NoteText,
  Container,
  NoteTitle,
  TitleContainer,
  TitleText,
  FinishButton,
} from './AuthenticateMember.styles'
import { MEMBER_CONTACT_DETAILS, VALIDATE_BIODATA } from '../../../../gql/comms'
import LoadingIcon from '../../../../assets/img/icons/loading.svg'

type AuthQuestions = {
  title: string
  value: string | number
  isConfirmed: boolean
  isFailed: boolean
}
const AuthenticateMember = ({
  antaraId,
  sessionName,
  isValidationFailed,
  isValidationSuccess,
  sessionId,
}: {
  antaraId: string
  sessionName: string
  isValidationFailed: (value: boolean) => void
  isValidationSuccess: () => void
  sessionId?: string
}) => {
  const [questionsToDisplay, setQuestionsToDisplay] = useState<number[]>([0])
  const [memberAuthQuestions, setMemberAuthQuestions] = useState<
    AuthQuestions[]
  >([])
  const { data: rawApiRecords, loading } = useQuery(MEMBER_CONTACT_DETAILS, {
    variables: { antaraId },
  })
  const [verifyBiodata] = useMutation(VALIDATE_BIODATA)

  const questionsPassed = memberAuthQuestions.filter(
    (question) => question.isConfirmed
  )
  const authenticationDone = questionsToDisplay.length > 4
  const authSuccessful = authenticationDone && questionsPassed.length === 4
  const authFailed = authenticationDone && questionsPassed.length !== 4

  const titleColor = authSuccessful
    ? '#32d74b'
    : authFailed
    ? '#ff3b30'
    : '#8b95a5'

  useEffect(() => {
    if (rawApiRecords) {
      const valueType = [
        'fullName',
        'contactPhone1',
        'kenyaNationalId',
        'employerName',
      ]
      let authQuestions: any[] = [
        {
          title: 'Please confirm your full name',
          isConfirmed: false,
          isFailed: false,
        },
        {
          title: 'Please confirm phone number',
          isConfirmed: false,
          isFailed: false,
        },
        {
          title: 'Please confirm your national ID',
          isConfirmed: false,
          isFailed: false,
        },
        {
          title: 'Please confirm your employee (if employed)',
          isConfirmed: false,
          isFailed: false,
        },
      ]
      const record = rawApiRecords?.beneficiary.edges[0]?.node
      authQuestions = authQuestions.map((rec: any, idx: number) => {
        return { ...rec, value: record[valueType[idx]] }
      })
      setMemberAuthQuestions(authQuestions)
    }
  }, [rawApiRecords])

  useEffect(() => {
    if (authSuccessful) {
      verifyBiodata({
        variables: {
          sessionName,
          participantSessionId: sessionId,
        },
      })
    }
  }, [authSuccessful, sessionId, sessionName, verifyBiodata])

  const updateQuestion = (idx: number, color: string, isConfirmed: boolean) => {
    const updatedMember = { ...memberAuthQuestions[idx], color }
    if (isConfirmed) {
      updatedMember.isConfirmed = true
    } else {
      updatedMember.isFailed = true
    }
    const allQuestions = memberAuthQuestions
    allQuestions[idx] = updatedMember
    setMemberAuthQuestions(allQuestions)
    setQuestionsToDisplay((questionsToDisplay) => [
      ...questionsToDisplay,
      questionsToDisplay[questionsToDisplay.length - 1] + 1,
    ])
  }

  const renderQuestions = () => {
    return questionsToDisplay.map((idx) => {
      const memberDetail = memberAuthQuestions[idx]
      if (idx < 4) {
        return (
          <Content key={idx}>
            <div>
              <ContentText style={{ color: '#8b95a5' }}>
                {memberDetail.title}
              </ContentText>
              <ContentText>{memberDetail.value}</ContentText>
            </div>
            <div className="d-flex flex-end">
              <CheckContainer
                color={memberDetail.isConfirmed ? '#ebfbed' : '#f9fafc'}
                onClick={() =>
                  !memberDetail.isConfirmed &&
                  !memberDetail.isFailed &&
                  updateQuestion(idx, '#ebfbed', true)
                }
              >
                <Check
                  width={18}
                  color={memberDetail.isConfirmed ? '#73e383' : '#a6acb8'}
                />
              </CheckContainer>
              <CheckContainer
                color={memberDetail.isFailed ? '#e297976b' : '#f9fafc'}
                onClick={() =>
                  !memberDetail.isConfirmed &&
                  !memberDetail.isFailed &&
                  updateQuestion(idx, 'red', false)
                }
              >
                <X
                  width={18}
                  color={memberDetail.isFailed ? '#ff003b' : '#a6acb8'}
                />
              </CheckContainer>
            </div>
          </Content>
        )
      }
      return <></>
    })
  }
  return (
    <div
      style={{
        padding: '16px',
      }}
    >
      <TitleContainer>
        <TitleText>Validate the Member</TitleText>
        <TitleText color={titleColor}>
          {questionsToDisplay[questionsToDisplay.length - 1]}/4
        </TitleText>
      </TitleContainer>
      {!authenticationDone && (
        <>
          {loading || memberAuthQuestions.length === 0 ? (
            <AuthLoader>
              <LoadingIcon />
            </AuthLoader>
          ) : (
            renderQuestions()
          )}
        </>
      )}
      {authSuccessful && (
        <Container>
          <CheckCircle color="#98eca4" width={80} height={80} />
          <NoteTitle>Member successfully validated</NoteTitle>
          <NoteText>Julius Test Kabangi</NoteText>
          <FinishButton onClick={isValidationSuccess}>
            Finish Validation
          </FinishButton>
        </Container>
      )}
      {authFailed && (
        <Container>
          <Slash color="#ff9d97" width={80} height={80} />
          <NoteTitle>Member answered incorrectly</NoteTitle>
          <NoteText>
            “I am sorry, but for security and confidentiality reason, we cannot
            continue the call”
          </NoteText>
          <FinishButton onClick={() => isValidationFailed(false)}>
            Finish Validation
          </FinishButton>
        </Container>
      )}
    </div>
  )
}

export default AuthenticateMember
