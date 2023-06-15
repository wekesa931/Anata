import { Button, ButtonProps, CircularProgress } from '@mui/material'
import React from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

type PrimaryButtonProps = ButtonProps & {
  kind?: 'primary' | 'secondary' | 'error'
  loading?: boolean
}

function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <Button
      {...props}
      variant={props?.variant || 'contained'}
      className={`${
        !props?.disabled && props.kind === 'error'
          ? 'bg-red-100 text-white'
          : props.variant === 'outlined'
          ? 'border border-primary-button text-primary-button'
          : props.variant === 'text'
          ? 'text-primary-button bg-transparent'
          : 'bg-primary-button text-white'
      } py-2 px-4 rounded-md font-rubik font-medium  ${props.className}`}
    >
      {props.loading ? (
        <CircularProgress className="h-5 w-5" />
      ) : (
        props.children
      )}
    </Button>
  )
}

export function PreviousButton(props: PrimaryButtonProps) {
  return (
    <PrimaryButton
      {...props}
      startIcon={<KeyboardDoubleArrowLeftIcon />}
      variant="outlined"
    />
  )
}

export function NextButton(props: PrimaryButtonProps) {
  return <PrimaryButton {...props} endIcon={<KeyboardDoubleArrowRightIcon />} />
}

export default PrimaryButton
