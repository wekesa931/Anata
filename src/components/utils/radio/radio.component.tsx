import React from 'react'
import styles from './radio.component.css'

type RadioProps = {
  checked: boolean
  name: string
  label: string
  value: string
  onChange: any
}

const Radio = ({ label, name, value, onChange, checked }: RadioProps) => {
  return (
    <button className="btn-unstyled" onClick={(e) => onChange(e, value)}>
      <label htmlFor={name} className={`${styles.container} text-small`}>
        {label}
        <input
          name={name}
          type="radio"
          value={value}
          checked={checked}
          readOnly
        />
        <span className={styles.checkmark} />
      </label>
    </button>
  )
}

export default Radio
