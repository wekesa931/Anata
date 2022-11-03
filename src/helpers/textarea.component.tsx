import React from 'react'

type TextAreaProps = {
  value: any
  disabled: boolean
}
const MIN_TEXTAREA_HEIGHT = 32

function TextArea({ value, disabled }: TextAreaProps) {
  const textareaRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (textareaRef) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${Math.max(
        textareaRef.current.scrollHeight,
        MIN_TEXTAREA_HEIGHT
      )}px`
    }
  }, [value])

  return (
    <textarea
      className="form-control"
      disabled={disabled}
      ref={textareaRef}
      style={{
        minHeight: MIN_TEXTAREA_HEIGHT,
        resize: 'none',
        overflow: 'hidden',
      }}
      value={value}
    />
  )
}

export default TextArea
