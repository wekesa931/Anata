import React from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

export const getClassName = (
  variant: LoadingButtonProps['variant'],
  color: LoadingButtonProps['color'],
  disabled: boolean
) => {
  if (disabled) {
    return `bg-disabled-grey text-white`
  }

  if (variant === 'contained') {
    if (color === 'error') {
      return `bg-red-100 text-white hover:bg-red-btn-hover`
    }
  } else if (variant === 'outlined') {
    if (color === 'primary') {
      return `border-blue-btn text-blue-btn `
    }
    if (color === 'error') {
      return `border-red-100 text-red-100 hover:bg-red-btn-hover`
    }
  } else if (variant === 'text') {
    if (color === 'primary') {
      return `text-blue-btn `
    }
    if (color === 'error') {
      return `text-red-100 hover:bg-red-btn-hover`
    }
  }

  return `bg-blue-btn text-white hover:bg-blue-btn-hover`
}

type PrimaryButtonProps = LoadingButtonProps & {
  onClick?: () => any
}

function PrimaryButton(props: PrimaryButtonProps) {
  const [error, setError] = React.useState(null)
  const { loading, ...rest } = props

  const variant = props?.variant || 'contained'
  const color = props?.color || 'primary'

  const onButtonClick = () => {
    props.onClick && props.onClick()?.catch((e) => setError(e.message))
  }

  return (
    <LoadingButton
      {...rest}
      onClick={onButtonClick}
      variant={variant}
      className={`py-2 px-4 font-rubik font-medium ${getClassName(
        variant,
        color,
        props?.disabled || false
      )}  ${props.className}`}
      loading={loading}
      color={color}
    >
      {props.children}
      {error && (
        <div className="z-50 top-5 absolute items-center bg-red-100 p-2 rounded-2xl min-w-52">
          <p>{error}</p>
        </div>
      )}
    </LoadingButton>
  )
}

export function PreviousButton(props: LoadingButtonProps) {
  return (
    <PrimaryButton
      {...props}
      startIcon={<KeyboardDoubleArrowLeftIcon />}
      variant="outlined"
    />
  )
}

export function NextButton(props: LoadingButtonProps) {
  return (
    <PrimaryButton
      {...props}
      endIcon={<KeyboardDoubleArrowRightIcon />}
      variant="contained"
    />
  )
}

export default PrimaryButton
