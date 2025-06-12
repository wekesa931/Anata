import React, { useEffect } from 'react'
import { LoadingButton, LoadingButtonProps } from '@mui/lab'

type HorizontalButtonProps = LoadingButtonProps & {
  leftButton: any
  rightButton: any
  disabled?: boolean
}

function HorizontalPairButton(props: HorizontalButtonProps) {
  const [error, setError] = React.useState(null)

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null)
      }, 4000)
    }
  }, [error])

  const onButtonClick = () => {
    props.rightButton.onClick &&
      props.rightButton?.onClick()?.catch((e) => setError(e.message))
  }

  const isLeftDisabled = props.disabled || props.leftButton.disabled
  const isRightDisabled = props.disabled || props.rightButton.disabled

  return (
    <div className="mt-4 flex justify-between">
      <LoadingButton
        {...props.leftButton}
        disabled={isLeftDisabled}
        style={{ width: '48%' }}
        onClick={props.leftButton.onClick}
      >
        {props.leftButton.text}
      </LoadingButton>
      <LoadingButton
        {...props.rightButton}
        disabled={isRightDisabled}
        className={isRightDisabled ? 'opacity-50' : ''}
        style={{ width: '48%' }}
        onClick={onButtonClick}
      >
        {props.rightButton.text}
      </LoadingButton>
      {error && (
        <div className="z-50 bottom-5 absolute items-center bg-red-100 p-2 rounded-2xl min-w-52">
          <p className="text-sm text-white-100">{error}</p>
        </div>
      )}
    </div>
  )
}

export default HorizontalPairButton
