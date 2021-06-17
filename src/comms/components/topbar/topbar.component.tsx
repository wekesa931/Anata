/*eslint-disable */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { Header, IconButton, TopBarWrapper } from './topbar.styles'
import Icon from '../icons/icon.component'
import { useMember } from '../../../context/member.context'

const TopBar = ({ title, goBack }: any) => {
  const history = useHistory()
  const { setCurrentMember } = useMember()

  const handleOnClick = () => {
    setCurrentMember(null)
    history && history.push(goBack)
  }

  return (
    <TopBarWrapper>
      {goBack && (
        <IconButton onClick={handleOnClick} role="navigate-back">
          <Icon name="chevron-left" fill="#205284" />
        </IconButton>
      )}
      <Header>
        <h3 style={{ margin: 0, fontFamily: 'Rubik, sans', color: '#205284' }}>
          {title}
        </h3>
      </Header>
    </TopBarWrapper>
  )
}

export default TopBar
/*eslint-disable */
