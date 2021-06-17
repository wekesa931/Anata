import React from 'react'
import styled from '@emotion/styled'

const Loading = ({ color, showText = true }: any) => {
  const Loader = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid ${color ? '#205284' : '#ff9800'};
    border-radius: 50%;
    width: 45px;
    height: 45px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
  const CenteredDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
  `

  return (
    <CenteredDiv>
      <Loader />
      <div>{showText ? 'Loading' : ''}</div>
    </CenteredDiv>
  )
}

export default Loading
