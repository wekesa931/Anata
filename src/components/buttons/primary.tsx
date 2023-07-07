import React from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton'

const getClassName = (
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

function PrimaryButton(props: LoadingButtonProps) {
  const { loading, ...rest } = props

  const variant = props?.variant || 'contained'
  const color = props?.color || 'primary'

  return (
    <LoadingButton
      {...rest}
      variant={variant}
      className={`py-2 px-4 rounded-md font-rubik font-medium ${getClassName(
        variant,
        color,
        props?.disabled || false
      )}  ${props.className}`}
      loading={loading}
      color={color}
    >
      {props.children}
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
