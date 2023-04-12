import React from 'react'
import LoadingIcon from '../../../../../assets/img/icons/loading.svg'

type LoadingMessageType = {
  message: string
}
function LoadingComponent({ message }: LoadingMessageType) {
  return (
    <div className="d-flex flex-direction-column flex-align-center margin-top-32">
      <LoadingIcon />
      <p className="text-small"> {message && message} </p>
    </div>
  )
}
export default LoadingComponent
